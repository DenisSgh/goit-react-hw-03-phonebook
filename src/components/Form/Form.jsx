import React, { Component } from 'react';
import shortid from 'shortid';

import PropTypes from 'prop-types';
import Section from 'components/Section';
import s from './Form.module.css';

class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  handleCreateContact = e => {
    e.preventDefault();
    const { name, value } = e.currentTarget;

    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { name } = this.state;
    const { contacts, onSubmit } = this.props;

    if (contacts.find(contact => contact.name === name)) {
      return alert(`${name} is already in the contact list`);
    }

    onSubmit(this.state);

    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const nameId = shortid.generate();
    const numberId = shortid.generate();

    return (
      <Section title={this.props.title}>
        <form className={s.form} onSubmit={this.handleSubmit}>
          <label htmlFor={nameId}>
            Name
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleCreateContact}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
              id={nameId}
              required
            />
          </label>
          <label htmlFor={numberId}>
            Number
            <input
              type="tel"
              name="number"
              value={this.state.number}
              onChange={this.handleCreateContact}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
              id={numberId}
              required
            />
          </label>
          <button type="submit" className={s.button}>
            Add new contact
          </button>
        </form>
      </Section>
    );
  }
}

Form.propTypes = {
  title: PropTypes.string.isRequired,
  contacts: PropTypes.arrayOf(PropTypes.shape(PropTypes.string.isRequired)),
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
