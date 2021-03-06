import axios from 'axios'
import BACKEND_URL from './ApiConfig'
import { getCookieFromBrowser } from './cookie'

/*
Auth
*/

export const register = (email, password, questionIdx, answer, role) => {
  /**
   * Creates a new user to website
   * Requires email,
   * password,
   * questionIdx(Chosen security question),
   * answer to that security question,
   * and new user role
   * Returns REGISTER_SUCCESS upon success
   * Returns REGISTER_FAIL upon failure
   */
  let data = new FormData()
  data.append('email', email)
  data.append('password', password)
  data.append('securityQuestionAnswer', answer)
  data.append('questionIdx', questionIdx)
  data.append('role', role)
  data.append('answer', answer)
  return axios
    .post(BACKEND_URL + '/register', data)
    .then(response => {
      return {
        type: 'REGISTER_SUCCESS',
        response
      }
    })
    .catch(error => {
      return {
        type: 'REGISTER_FAIL',
        error
      }
    })
}

export const login = (email, password) => {
  /**
   * Endpoint to reference when a user is trying to login
   * Takes in an email and a password of given user
   * Authenticates user in backend and
   * Returns LOGIN_SUCCESSFUL if user successfully logged in
   * Returns LOGIN_FAIL if user fails to log in
   */
  let data = new FormData()
  data.append('email', email)
  data.append('password', password)
  return axios
    .post(BACKEND_URL + '/login', data)
    .then(response => {
      return {
        type: 'LOGIN_SUCCESSFUL',
        response
      }
    })
    .catch(error => {
      return {
        type: 'LOGIN_FAIL',
        error
      }
    })
}

export const getUser = () => {
  /**
   * Endpoint to reference when a user is trying to login
   * Takes in an email and a password of given user
   * Authenticates user in backend and
   * Returns LOGIN_SUCCESSFUL if user successfully logged in
   * Returns LOGIN_FAIL if user fails to log in
   */
  return axios
    .get(BACKEND_URL + '/getUser', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        token: getCookieFromBrowser('token')
      }
    })
    .then(response => {
      return {
        type: 'LOGIN_SUCCESSFUL',
        response
      }
    })
    .catch(error => {
      return {
        type: 'LOGIN_FAIL',
        error
      }
    })
}

export const verify = () => {
  /**
   *
   */
  return axios
    .post(BACKEND_URL + '/verify', null, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        token: getCookieFromBrowser('token')
      }
    })
    .then(response => {
      return {
        type: 'REGISTER_SUCCESS',
        response
      }
    })
    .catch(error => {
      console.log(error)
      return {
        type: 'REGISTER_FAIL',
        error
      }
    })
}

export const getSecurityQuestions = () => {
  /**
   * Returns all default security questions
   * If a response is returned, shows LOGIN_SUCCESSFUL
   * Else LOGIN_FAIL
   */
  return axios
    .get(BACKEND_URL + '/getSecurityQuestions', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        token: getCookieFromBrowser('token')
      }
    })
    .then(response => {
      return {
        type: 'LOGIN_SUCCESSFUL',
        response
      }
    })
    .catch(error => {
      return {
        type: 'LOGIN_FAIL',
        error
      }
    })
}

export const setSecurityQuestion = (questionIdx, answer, password) => {
  /**
   * For a user, sets/changes security question
   * Requires:
   * index of new security question
   * answer to new security question
   * password of user
   * If successful returns LOGIN_SUCCESSFUL
   * Else returns LOGIN_FAIL
   */
  let data = new FormData()
  data.append('questionIdx', questionIdx)
  data.append('answer', answer)
  data.append('password', password)
  return axios
    .post(BACKEND_URL + '/addSecurityQuestionAnswer', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        token: getCookieFromBrowser('token')
      }
    })
    .then(response => {
      return {
        type: 'LOGIN_SUCCESSFUL',
        response
      }
    })
    .catch(error => {
      return {
        type: 'LOGIN_FAIL',
        error
      }
    })
}

export const updateSecurityQuestion = (questionIdx, answer, password) => {
  let data = new FormData()
  data.append('questionIdx', questionIdx)
  data.append('answer', answer)
  data.append('password', password)
  return axios
    .post(BACKEND_URL + '/updateSecurityQuestion', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        token: getCookieFromBrowser('token')
      }
    })
    .then(response => {
      return {
        type: 'LOGIN_SUCCESSFUL',
        response
      }
    })
    .catch(error => {
      return {
        type: 'LOGIN_FAIL',
        error
      }
    })
}

export const getSecurityQuestionForUser = email => {
  /**
   * given a user's email account
   * will return the user's chosen Security Question
   * Upon success, returns LOGIN_SUCCESSFUL
   * Else, returns LOGIN_FAIL
   */
  let data = new FormData()
  data.append('email', email)
  return axios
    .post(BACKEND_URL + '/getSecurityQuestionForUser', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        token: getCookieFromBrowser('token')
      }
    })
    .then(response => {
      return {
        type: 'LOGIN_SUCCESSFUL',
        response
      }
    })
    .catch(error => {
      console.log('ERROR: ', error)
      return null
    })
}

export const submitSecurityQuestionAnswer = (email, answer, questionIdx) => {
  /**
   * Given:
   * User's email
   * User's answer to their security question
   * Question index of the User's security question
   *
   * It will authenticate the response and send the user a password reset if answer is correct
   *
   * Returns LOGIN_SUCCESSFUL upon success
   * Returns 'ERROR: error info' upon failure
   */
  let data = new FormData()
  data.append('email', email)
  data.append('answer', answer)
  data.append('questionIdx', questionIdx)
  return axios
    .post(BACKEND_URL + '/forgotPassword', data)
    .then(response => {
      return {
        type: 'LOGIN_SUCCESSFUL',
        response
      }
    })
    .catch(error => {
      console.log('ERROR: ', error)
      return null
    })
}

export const resetPassword = (email, answer, pin, password) => {
  /**
   * Given:
   * User's email
   * User's security question answer
   * Pin received from reset email
   * New password
   *
   * it will reset the users password
   *
   * Returns LOGIN_SUCCESSFUL upon success
   * Returns 'ERROR: error info' upon failure
   */
  let data = new FormData()
  data.append('email', email)
  data.append('answer', answer)
  data.append('pin', pin)
  data.append('password', password)
  return axios
    .post(BACKEND_URL + '/resetPassword', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        token: getCookieFromBrowser('token')
      }
    })
    .then(response => {
      return {
        type: 'LOGIN_SUCCESSFUL',
        response
      }
    })
    .catch(error => {
      console.log('ERROR: ', error)
      return null
    })
}

export const changePassword = (currentPassword, newPassword) => {
  /**
   * Given:
   * User's current password
   * User's new password
   *
   * will change the users password
   *
   * Returns LOGIN_SUCCESSFUL upon success
   * Returns LOGIN_FAIL upon failure
   */
  let data = new FormData()
  data.append('currentPassword', currentPassword)
  data.append('newPassword', newPassword)
  return axios
    .post(BACKEND_URL + '/changePassword', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        token: getCookieFromBrowser('token')
      }
    })
    .then(response => {
      return {
        type: 'LOGIN_SUCCESSFUL',
        response
      }
    })
    .catch(error => {
      return {
        type: 'LOGIN_FAIL',
        error
      }
    })
}

export const verifyPIN = pin => {
  /**
   * Given:
   * Pin on password reset email
   *
   * will verify given pin
   *
   * Returns LOGIN_SUCCESSFUL upon success
   * Returns LOGIN_FAIL upon failure
   */
  let data = new FormData()
  data.append('pin', pin)
  return axios
    .post(BACKEND_URL + '/verifyEmail', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        token: getCookieFromBrowser('token')
      }
    })
    .then(response => {
      return {
        type: 'LOGIN_SUCCESSFUL',
        response
      }
    })
    .catch(error => {
      return {
        type: 'LOGIN_FAIL',
        error
      }
    })
}

export const resendPIN = () => {
  /**
   * Will resend a verification email to user email
   *
   * Returns LOGIN_SUCCESSFUL upon success
   * Returns LOGIN_FAIL upon failure
   */
  return axios
    .post(BACKEND_URL + '/resendVerificaitonEmail', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        token: getCookieFromBrowser('token')
      }
    })
    .then(response => {
      return {
        type: 'LOGIN_SUCCESSFUL',
        response
      }
    })
    .catch(error => {
      return {
        type: 'LOGIN_FAIL',
        error
      }
    })
}

/*
Portfolio Manager
*/

export const getPMByEmail = email => {
  /**
   * Gets all PM information given the PM's email
   *
   * Returns all PM information upon success
   * Returns 'ERROR: error info' upon failure
   */
  let requestString = BACKEND_URL + '/portfolio_managers?email=' + email
  return axios
    .get(requestString, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        token: getCookieFromBrowser('token')
      }
    })
    .then(response => {
      return response.data.result.portfolio_manager[0]
    })
    .catch(error => {
      console.log('ERROR: ', error)
      return null
    })
}

/*
Field Partner
*/

export const getFPByID = id => {
  /**
   * Returns all information of an FP given their id
   *
   * Returns all fp information upon success
   * Returns 'ERROR: error info' upon failure
   */
  let requestString = BACKEND_URL + '/field_partner/' + id
  return axios
    .get(requestString)
    .then(response => {
      return response.data.result.field_partner
    })
    .catch(error => {
      console.log('ERROR: ', error)
      return null
    })
}

export const getFPByEmail = email => {
  /**
   * gets all fp information given an email
   *
   * Returns all fp information upon success
   * Returns 'ERROR: error info' upon failure
   */
  let requestString = BACKEND_URL + '/field_partners?email=' + email
  return axios
    .get(requestString, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        token: getCookieFromBrowser('token')
      }
    })
    .then(response => {
      return response.data.result.field_partner[0]
    })
    .catch(error => {
      console.log('ERROR: ', error)
      return null
    })
}

export const createFieldPartner = (org_name, email, pm_id) => {
  /**
   * Given an organization name, and email address, and the id of the PM working with said organization
   * Creates a new Field Partner in the database with that given information
   * Returns CREATE_FP_SUCCESS upon success
   * Returns CREATE_FP_FAIL upon failure
   */
  let requestString = BACKEND_URL + '/createFP'
  let data = new FormData()
  data.append('org_name', org_name)
  data.append('email', email)
  data.append('pm_id', pm_id)
  data.append('app_status', 'New Partner')
  return axios
    .post(requestString, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        token: getCookieFromBrowser('token')
      }
    })
    .then(response => {
      return {
        type: 'CREATE_FP_SUCCESS',
        response
      }
    })
    .catch(error => {
      return {
        type: 'CREATE_FP_FAIL',
        error
      }
    })
}

export const getPartnersByPM = pm_id => {
  /**
   * Given:
   * PM id in database
   *
   * Returns all field partners associated to that pm upon success
   * Returns GET_PARTNERS_FAIL upon failure
   */
  let requestString = BACKEND_URL + '/field_partners?pm_id=' + pm_id
  return axios
    .get(requestString, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        token: getCookieFromBrowser('token')
      }
    })
    .then(response => {
      return response.data.result.field_partner
    })
    .catch(error => {
      return {
        type: 'GET_PARTNERS_FAIL',
        error
      }
    })
}

export const updateFieldPartnerStatus = (id, status) => {
  /**
   * Given
   * FP id
   * new status
   *
   * Updates the field partners status
   *
   * Returns UPDATE_FP_SUCCESS upon success
   * Returns UPDATE_FP_FAIL upon failure
   */
  let requestString = BACKEND_URL + '/field_partner/' + id
  let data = new FormData()
  data.append('app_status', status)
  return axios
    .put(requestString, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        token: getCookieFromBrowser('token')
      }
    })
    .then(response => {
      return {
        type: 'UPDATE_FP_SUCCESS',
        response
      }
    })
    .catch(error => {
      return {
        type: 'UPDATE_FP_FAIL',
        error
      }
    })
}

export const updateFPInstructions = (id, instructions) => {
  /**
   * Given
   * FP id
   * information
   *
   * Updates the field partners information
   *
   * Returns UPDATE_FP_SUCCESS upon success
   * Returns UPDATE_FP_FAIL upon failure
   */
  let requestString = BACKEND_URL + '/field_partner/' + id
  let data = new FormData()
  data.append('instructions', instructions)
  return axios
    .put(requestString, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        token: getCookieFromBrowser('token')
      }
    })
    .then(response => {
      return {
        type: 'UPDATE_FP_SUCCESS',
        response
      }
    })
    .catch(error => {
      return {
        type: 'UPDATE_FP_FAIL',
        error
      }
    })
}

export const updateFieldPartnerDueDate = (id, dueDate) => {
  /**
   * Given
   * FP id
   * dueDate
   *
   * Updates the field partners due date
   *
   * Returns UPDATE_FP_SUCCESS upon success
   * Returns UPDATE_FP_FAIL upon failure
   */
  let requestString = BACKEND_URL + '/field_partner/' + id
  let data = new FormData()
  data.append('due_date', dueDate)
  return axios
    .put(requestString, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        token: getCookieFromBrowser('token')
      }
    })
    .then(response => {
      return {
        type: 'UPDATE_FP_SUCCESS',
        response
      }
    })
    .catch(error => {
      return {
        type: 'UPDATE_FP_FAIL',
        error
      }
    })
}

/*
Document Class
*/

export const getAllDocumentClasses = () => {
  /**
   * Gets all document classes for a PM role
   *
   * Returns document classes upon success
   * Returns 'ERROR: error info' upon failure
   */
  let requestString = BACKEND_URL + '/document_classes'
  return axios
    .get(requestString, null, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        token: getCookieFromBrowser('token')
      }
    })
    .then(response => {
      return response.data.result.document_class
    })
    .catch(error => {
      console.log('ERROR: ', error)
      return null
    })
}

export const createDocumentClass = (name, description, file, file_name) => {
  /**
   * Given
   * a document class name
   * a description for new document class
   * an example file
   * the name of the example file
   *
   * creates a new document class with given name, description, and example file
   *
   * Returns UPLOAD_FILE_SUCCESS upon success
   * Returns UPLOAD_FILE_FAIL upon failure
   */
  var data = new FormData()
  data.append('file', file)
  data.append('fileName', file_name)
  data.append('name', name)
  data.append('description', description)
  return axios
    .post(BACKEND_URL + '/document_classes', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        token: getCookieFromBrowser('token')
      }
    })
    .then(response => {
      return {
        type: 'UPLOAD_FILE_SUCCESS',
        response
      }
    })
    .catch(error => {
      return {
        type: 'UPLOAD_FILE_FAIL',
        error
      }
    })
}

export const updateDocumentClass = (id, name, description, file, file_name) => {
  /**
   * Given
   * a docClass id
   * a new name
   * a new description
   * a new example file
   * name of new example file
   *
   * updates a document class
   *
   * Returns UPDATE_DOCUMENT_CLASS_SUCCESS upon success
   * Returns UPDATE_DOCUMENT_CLASS_FAIL upon failure
   */
  var data = new FormData()
  data.append('file', file)
  data.append('fileName', file_name)
  data.append('name', name)
  data.append('description', description)
  return axios
    .put(BACKEND_URL + '/document_class/' + id, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        token: getCookieFromBrowser('token')
      }
    })
    .then(response => {
      return {
        type: 'UPDATE_DOCUMENT_CLASS_SUCCESS',
        response
      }
    })
    .catch(error => {
      return {
        type: 'UPDATE_DOCUMENT_CLASS_FAIL',
        error
      }
    })
}

export const deleteDocumentClass = id => {
  /**
   * Given
   * docClass id
   *
   * deletes docClasses and related files of that id in the database
   *
   * Returns DELETE_DOCUMENT_CLASS_SUCCESS upon success
   * Returns DELETE_DOCUMENT_CLASS_FAIL upon failure
   */
  return axios
    .delete(BACKEND_URL + '/document_class/' + id, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        token: getCookieFromBrowser('token')
      }
    })
    .then(response => {
      return {
        type: 'DELETE_DOCUMENT_CLASS_SUCCESS',
        response
      }
    })
    .catch(error => {
      return {
        type: 'DELETE_DOCUMENT_CLASS_FAIL',
        error
      }
    })
}

/*
Document
*/

export const deleteDocument = id => {
  /**
   * Given
   * document id
   *
   * deletes document from database
   *
   * Returns DELETE_DOCUMENT_SUCCESS on success
   * Returns DELETE_DOCUMENT_FAIL on failure
   */
  let requestString = BACKEND_URL + '/document/' + id
  return axios
    .delete(requestString, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        token: getCookieFromBrowser('token')
      }
    })
    .then(response => {
      return {
        type: 'DELETE_DOCUMENT_SUCCESS',
        response
      }
    })
    .catch(error => {
      return {
        type: 'DELETE_DOCUMENT_FAIL',
        error
      }
    })
}

export const deleteDocumentsByFP = id => {
  /**
   * Given
   * FP id
   *
   * deletes all documents related to FP from database
   *
   * Returns DELETE_DOCUMENTS_SUCCESS on success
   * Returns DELETE_DOCUMENTS_FAIL on failure
   */
  let requestString = BACKEND_URL + '/document/delete_by_fp/' + id
  return axios
    .delete(requestString, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        token: getCookieFromBrowser('token')
      }
    })
    .then(response => {
      return {
        type: 'DELETE_DOCUMENTS_SUCCESS',
        response
      }
    })
    .catch(error => {
      return {
        type: 'DELETE_DOCUMENTS_FAIL',
        error
      }
    })
}

export const downloadDocument = id => {
  /**
   *
   */
  let requestString = BACKEND_URL + '/box/download?file_id' + id
  return axios
    .get(requestString, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        token: getCookieFromBrowser('token')
      }
    })
    .then(response => {
      return response.data.result.output
    })
    .catch(error => {
      console.log('ERROR: ', error)
      return null
    })
}

export const updateDocumentStatus = (userID, id, status, reason) => {
  // I (Kelley) made it take the userID for notification generation
  /**
   * Given
   * document id
   * document's new status
   *
   * updates documents status in database
   *
   * Returns UPDATE_DOC_STATUS_SUCCESS upon success
   * Returns UPDATE_DOC_STATUS_FAIL upon failure
   */
  var data = new FormData()
  data.append('status', status)
  return axios
    .put(BACKEND_URL + '/document/' + id, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        token: getCookieFromBrowser('token')
      }
    })
    .then(response => {
      createMessage(userID, false, true, id, reason)
      return {
        type: 'UPDATE_DOC_STATUS_SUCCESS',
        response
      }
    })
    .catch(error => {
      return {
        type: 'UPDATE_DOC_STATUS_FAIL',
        error
      }
    })
}

export const uploadDocument = (userID, file, file_name, docID) => {
  // (Kelley) Made it take the userID for notification generation
  /**
   * Given
   * a file
   * the file name
   * the id referring to the document
   *
   * uploads document into the database
   *
   * Returns UPLOAD_FILE_SUCCESS upon success
   * Returns UPLOAD_FILE_FAIL upon failure
   */
  var data = new FormData()
  data.append('file', file)
  data.append('fileName', file_name)
  data.append('status', 'Pending')
  return axios
    .put(BACKEND_URL + '/document/' + docID, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        token: getCookieFromBrowser('token')
      }
    })
    .then(response => {
      createMessage(userID, false, false, docID)
      return {
        type: 'UPLOAD_FILE_SUCCESS',
        response
      }
    })
    .catch(error => {
      return {
        type: 'UPLOAD_FILE_FAIL',
        error
      }
    })
}

export const createDocuments = (userID, docClassIDs, dueDate) => {
  /**
   * Given
   * a userID
   * the id of a docClass
   * a duedate for the file
   *
   * creates a requested document and the duedate for that given document
   *
   * Returns CREATE_DOCUMENTS_SUCCESS upon success
   * Returns CREATE_DOCUMENTS_FAIL upon failure
   */
  let requestString = BACKEND_URL + '/documents'
  let data = new FormData()
  data.append('userID', userID)
  data.append('status', 'Missing')
  data.append('docClassIDs', docClassIDs)
  data.append('dueDate', dueDate)
  return axios
    .post(requestString, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        token: getCookieFromBrowser('token')
      }
    })
    .then(response => {
      // create the message here with the given docId
      let docIDs = response.data.result.docIDs
      docIDs.forEach(docID => {
        createMessage(userID, false, true, docID)
      })

      return {
        type: 'CREATE_DOCUMENTS_SUCCESS',
        response
      }
    })
    .catch(error => {
      return {
        type: 'CREATE_DOCUMENTS_FAIL',
        error
      }
    })
}

export const getDocumentsByUser = userID => {
  /**
   * Given
   * a user's id
   *
   * Returns all documents associated with user upon success
   * Returns "Error: error info" otherwise
   */
  let requestString = BACKEND_URL + '/documents?uid=' + userID
  return axios
    .get(requestString, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        token: getCookieFromBrowser('token')
      }
    })
    .then(response => {
      return response.data.result.documents
    })
    .catch(error => {
      console.log('ERROR: ', error)
      return null
    })
}

/*
Message
*/

export const getMessagesByFP = (fp_id, to_fp) => {
  let requestString = BACKEND_URL + '/messages?fp_id=' + fp_id + '&to_fp=' + to_fp
  return axios
    .get(requestString)
    .then(response => {
      return response.data.result.messages
    })
    .catch(error => {
      return {
        type: 'GET_MESSAGES_BY_ID_FAIL',
        error
      }
    })
}

export const getMessagesByPM = pm_id => {
  let requestString = BACKEND_URL + '/messages?pm_id=' + pm_id + '&to_fp=false'
  return axios
    .get(requestString)
    .then(response => {
      return response.data.result.messages
    })
    .catch(error => {
      return {
        type: 'GET_MESSAGES_BY_ID_FAIL',
        error
      }
    })
}

export const createMessage = (user_id, is_pm_id, to_fp, document_id, reason) => {
  /*
   * user_id: either fp or pm, will be determined by is_pm_id
   * status: document status that it is being changed to
   */
  let requestString = BACKEND_URL + '/messages'
  let data = new FormData()

  if (is_pm_id) {
    data.append('pm_id', user_id)
  } else {
    data.append('fp_id', user_id)
  }

  data.append('to_fp', to_fp)
  data.append('doc_id', document_id)

  if (reason) {
    data.append('reason', reason)
  }

  return axios
    .post(requestString, data)
    .then(response => {
      return {
        type: 'CREATE_MESSAGE_SUCCESS',
        response
      }
    })
    .catch(error => {
      return {
        type: 'CREATE_MESSAGE_FAIL',
        error
      }
    })
}
