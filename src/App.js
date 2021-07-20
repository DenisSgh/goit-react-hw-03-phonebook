import React, { Component } from 'react';
import shortid from 'shortid';

import Form from 'components/Form';
import Filter from 'components/Filter';
import Contacts from 'components/Contacts';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));

    if (contacts) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleSubmitContact = data => {
    const { name, number } = data;

    const contacts = {
      id: shortid.generate(),
      name,
      number,
    };

    this.setState(prevState => {
      return { contacts: [...prevState.contacts, contacts] };
    });
  };

  deleteContact = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  visibleContacts = () => {
    const { filter, contacts } = this.state;

    const normalaizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalaizedFilter),
    );
  };

  render() {
    const { contacts, filter } = this.state;
    const visibleContacts = this.visibleContacts();

    return (
      <>
        <Form
          title="Phonebook"
          contacts={contacts}
          onSubmit={this.handleSubmitContact}
        />
        <Filter value={filter} changeFilter={this.changeFilter} />
        <Contacts
          title="Contacts"
          contacts={visibleContacts}
          buttonDelete={this.deleteContact}
        />
      </>
    );
  }
}

export default App;
