import React, { useState, useEffect, useRef } from 'react';
import styles from './index.module.css';
import beautify from "xml-beautifier";
import { getPrefillXML, saveFormSubmission } from '../../api';

const ENKETO_URL = process.env.REACT_APP_ENKETO_URL
const FORM_MANAGER_URL = process.env.REACT_APP_FORM_MANAGER_URL
const HASURA_URL = process.env.REACT_APP_HASURA_URL

const GenericForm = (props) => {
  const { selectedFlow, setSelectedFlow } = props;
  const formSpec = require(`../../${selectedFlow.config}`);
  const [formData, setFormData] = useState("");
  const [formDataJson, setFormDataJSON] = useState("");
  const [isXml, setIsXml] = useState(false);


  const startingForm = formSpec.startingForm;
  const [fileUrls, setFileUrls] = useState({});
  const [formId, setFormId] = useState(startingForm);
  const [encodedFormSpec, setEncodedFormSpec] = useState(encodeURI(JSON.stringify(formSpec.forms[formId])));
  const [onFormSuccessData, setOnFormSuccessData] = useState(undefined);
  const [onFormFailureData, setOnFormFailureData] = useState(undefined);
  const [encodedFormURI, setEncodedFormURI] = useState('');
  const formSubmitted = useRef(false);

  useEffect(() => {
    // Manage onNext
    window.addEventListener('message', async function (e) {
      const data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
      try {
        const { nextForm, formData, onSuccessData, onFailureData } = data;
        console.log("data--->", data)
        if (data.fileURLs) setFileUrls(data.fileURLs)

        if (data?.state != "ON_FORM_SUCCESS_COMPLETED" && formData) {
          setFormData(beautify(formData))
          let jsonRes = await parseFormData(formData);
          if (jsonRes) setFormDataJSON(JSON.stringify(jsonRes, null, 2));
        }

        if (data?.state == "ON_FORM_SUCCESS_COMPLETED" && selectedFlow.submitToHasura && !formSubmitted.current) {
          formSubmitted.current = true;
          await saveFormSubmission({
            form_data: formData,
            form_name: formSpec.startingForm,
          });
          formSubmitted.current = false;
        }
        if (nextForm?.type === 'form') {
          setFormId(nextForm.id);
          setOnFormSuccessData(onSuccessData);
          setOnFormFailureData(onFailureData);
          setEncodedFormSpec(encodeURI(JSON.stringify(formSpec.forms[formId])));
          let newForm = await getPrefillXML(nextForm.id, formSpec.forms[nextForm.id].onFormSuccess);
          console.log("new FORM", newForm)
          setEncodedFormURI(newForm);
        } else if (nextForm?.type == 'url') {
          window.location.href = nextForm.url;
        }

      }
      catch (e) {
        console.log(e)
      }
    });
  }, []);

  const handleFormView = async (e) => {
    setIsXml(e)
    if (e) {
      let jsonRes = await parseFormData(formData);
      if (jsonRes) setFormDataJSON(JSON.stringify(jsonRes, null, 2));
    }
  }

  const parseFormData = async (formData) => {
    let jsonRes = await fetch(`${FORM_MANAGER_URL}/parse`, {
      method: 'POST',
      body: JSON.stringify({
        xml: formData,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
    });
    jsonRes = await jsonRes.json();
    return jsonRes?.data;
  }

  const getForm = async () => {
    let prefilledForm = await getPrefillXML(startingForm, formSpec.forms[formId].onFormSuccess);
    setEncodedFormURI(prefilledForm)
  }

  useEffect(() => {
    getForm();
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.header + ' animate__animated animate__slideInLeft animate__faster'}>
        <div onClick={() => setSelectedFlow({})}>Go Back</div>
        <div>Workflow /{selectedFlow.name}</div>
      </div>
      {Object.keys(fileUrls)?.length > 0 && <div className={styles.imageLinks}>
        <p>Uploaded Images</p>
        {Object.keys(fileUrls)?.map(el => <a href={fileUrls[el].url} target="_blank">{fileUrls[el].url}</a>)}
      </div>
      }
      {
        selectedFlow.offline && <p className='animate__animated animate__fadeIn' style={{ color: '#fff', fontSize: '1.5rem' }}>Disable internet and try submitting the form</p>
      }
      {
        selectedFlow.submitToHasura && <p className='animate__animated animate__fadeIn' style={{ color: '#fff', fontSize: '1.5rem' }}>Submit the form and check <a style={{ color: '#ffc119' }} target="_blank" href={`${HASURA_URL}`}>Hasura</a></p>
      }
      <div className={styles.formContainer}>
        <iframe title='current-form'
          className={styles.odkForm}
          src={
            `${ENKETO_URL}/preview?formSpec=${encodedFormSpec}&xform=${encodedFormURI}`
          }
        />
        <div className={styles.jsonResponse}>
          <div className={styles.toggleBtn}>
            <label className={styles.switch}>
              <input type="checkbox" value={isXml} onChange={e => handleFormView(e.target.checked)} />
              <span className={styles.slider}></span>
            </label>
            {isXml ? <span className='animate__animated animate__fadeIn'>XML</span> : <span className='animate__animated animate__fadeIn'>JSON</span>}
          </div>
          <textarea value={!isXml ? formData : formDataJson} className={styles.formText}>
          </textarea>
        </div>
      </div>
    </div>
  );
}

export default GenericForm;
