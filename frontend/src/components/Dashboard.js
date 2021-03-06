import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'reactstrap'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  updateDocuments,
  updateMessages,
  updateInstructions,
  setUserType,
  beginLoading,
  endLoading
} from '../redux/modules/user'

import WithAuth from './auth/WithAuth'
import DocumentList from './DocumentList'
import NavBar from './NavBar'

import {
  getDocumentsByUser,
  getMessagesByFP,
  updateFieldPartnerStatus,
  getFPByID
} from '../utils/ApiWrapper'

import add from '../media/add.png'

const mapStateToProps = state => ({
  isPM: state.user.isPM,
  documents: state.user.documents,
  messages: state.user.messages,
  information: state.user.information,
  language: state.user.language
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateDocuments,
      updateMessages,
      setUserType,
      beginLoading,
      endLoading,
      updateInstructions
    },
    dispatch
  )
}
export class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fp_statuses: ['Missing', 'Rejected', 'Pending', 'Approved'],
      pm_statuses: ['Pending', 'Missing', 'Rejected', 'Approved'],
      pm_id: null
    }

    this.handleFinish = this.handleFinish.bind(this)
  }

  async componentDidMount() {
    /**
     * Contains all documents received from backend
     */

    this.props.beginLoading()
    let documentsReceived = []

    // temporary - REMOVE after auth integration
    documentsReceived = await getDocumentsByUser(this.props.match.params.id)
    this.props.setUserType(this.props.match.params.user === 'pm')

    /**
     * Contains all messages received from backend
     */
    const messagesReceived = await getMessagesByFP(
      this.props.match.params.id,
      this.props.match.params.user === 'fp'
    )

    /**
     * Contains all information received from backend
     */
    const fp = await getFPByID(this.props.match.params.id)

    const instructionsReceived = fp ? fp.instructions : null

    // Processing the date to a readable string
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    let due_date = new Date(fp.due_date).toLocaleDateString('en-US', options)

    this.setState({
      pm_id: fp ? fp.pm_id : null,
      dueDate: due_date
    })

    if (documentsReceived) {
      this.props.updateDocuments(documentsReceived)
    } else {
      this.props.updateDocuments([])
    }

    if (messagesReceived) {
      this.props.updateMessages(messagesReceived)
    } else {
      this.props.updateMessages([])
    }

    if (instructionsReceived) {
      this.props.updateInstructions(instructionsReceived)
    } else {
      this.props.updateInstructions('')
    }
    this.props.endLoading()
  }

  /**
   * When a Field Partner has finished the process, this method is called to move their status to 'Complete'
   */
  async handleFinish() {
    this.props.beginLoading()
    await updateFieldPartnerStatus(this.props.match.params.id, 'Complete')
    this.props.history.push('/overview/' + this.state.pm_id)
    this.props.endLoading()
  }

  pStyle = {
    margin: 'auto'
  }

  languages = {
    English: {
      dueDate: 'Due date: ',
      update: 'Update requirements/instructions',
      finish: 'Finish process'
    },
    Spanish: {
      dueDate: 'Fecha de vencimiento: ',
      update: 'Actualizar requisitos/instrucciones',
      finish: 'Finalizar proceso'
    },
    French: {
      dueDate: 'Date limite: ',
      update: 'Actualiser conditions/instructions',
      finish: 'Finir processus'
    },
    Portuguese: {
      dueDate: 'Data de vencimento: ',
      update: 'Atualize os requisitos e instruções',
      finish: 'Finalizar / concluir o processo'
    }
  }

  render() {
    let text = this.languages[this.props.language]
    if (!text) {
      text = this.languages['English']
    }

    return (
      <div className="background-rectangles maxheight">
        <NavBar inDashboard />
        <Container className="text-centered" id="dashboard-container">
          <h1>{text.dueDate + this.state.dueDate}</h1>
          {this.props.isPM ? (
            <Row>
              <Col md="12">
                <Button
                  className="add-doc-text"
                  color="transparent"
                  onClick={() => this.props.history.push('/setup/' + this.props.match.params.id)}
                >
                  <img className="addImg" src={add} alt="Add icon" />
                  <span className="add-doc-text">{text.update}</span>
                </Button>
              </Col>
              <Col md="12">
                <Button color="success" onClick={this.handleFinish}>
                  {text.finish}
                </Button>
              </Col>
            </Row>
          ) : null}
          <Row>
            {this.props.documents
              ? this.props.isPM
                ? this.state.pm_statuses.map((docstatus, index) => {
                    /* based on the code the index should suffice as a unique key since no new tables
                    are going to be added and thus there doesn't seem to be a risk of collision; also
                    only one of these blocks will run */
                    return (
                      <Col sm="12" md="6" className="dashboard-width-override" key={index}>
                        <DocumentList
                          documents={this.props.documents[docstatus]}
                          status={docstatus}
                        />
                      </Col>
                    )
                  })
                : this.state.fp_statuses.map((docstatus, index) => {
                    return (
                      <Col sm="12" md="6" className="dashboard-width-override" key={index}>
                        <DocumentList
                          documents={this.props.documents[docstatus]}
                          status={docstatus}
                        />
                      </Col>
                    )
                  })
              : null}
          </Row>
        </Container>
      </div>
    )
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithAuth(Dashboard))
