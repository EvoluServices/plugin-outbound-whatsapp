import React from 'react';
import { connect } from 'react-redux';
import { Actions, withTheme, Manager} from '@twilio/flex-ui';
import {
  Select,
  Option,
  Box,
} from '@twilio-paste/core';

class CannedResponses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      response: '',
    }
  }

  manager = Manager.getInstance();

  handleChange = (event) => {
    const value = event.target.value;
    this.setState({ [event.target.name]: value });

    if (value) {
      Actions.invokeAction('SendMessage', {
        conversationSid: this.props.channelSid,
        body: value
      });
    }
  }

  render() {
    return (

      /* Rendering canned responses. This is an example in which templates are hard-coded. They can be dynamic using Twilio Sync */
      <Box marginBottom="space80">
        <Select
          value={this.state.response}
          onChange={this.handleChange}
          name="response"
        >
          <Option value="">Enviar resposta predefinida...</Option>
          <Option value="Como posso te ajudar?">Como posso te ajudar?</Option>
          <Option value="Posso te ajudar em algo mais?">Posso te ajudar em algo mais?</Option>
          <Option value="Certo. Aguarde só um momento enquanto verifico">Certo. Aguarde só um momento enquanto verifico</Option>
        </Select>
      </Box>
    )
  }
};

const mapStateToProps = (state, ownProps) => {
  let currentTask = false;
  state.flex.worker.tasks.forEach((task) => {
    if (ownProps.channelSid === task.attributes.channelSid) {
      currentTask = task;
    }
  })

  return {
    state,
    currentTask,
  }
}

export default connect(mapStateToProps)(withTheme(CannedResponses));
