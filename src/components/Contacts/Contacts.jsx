import PropTypes from 'prop-types';

import Section from 'components/Section';
import s from './Contacts.module.css';

const Contacts = ({ title, contacts, buttonDelete }) => {
  return (
    <Section title={title}>
      {contacts.length !== 0 ? (
        <ul className={s.list}>
          {contacts.map(contact => {
            const { id, name, number } = contact;

            return (
              <li className={s.item} key={id}>
                <div className={s.position}>
                  <span>{name}:</span>
                  <span>{number}</span>
                </div>
                <button
                  className={s.button}
                  type="button"
                  onClick={() => buttonDelete(id)}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className={s.notification}>No contacts found :(</p>
      )}
    </Section>
  );
};

Contacts.propTypes = {
  title: PropTypes.string.isRequired,
  contacts: PropTypes.arrayOf(PropTypes.shape(PropTypes.string.isRequired)),
  buttonDelete: PropTypes.func.isRequired,
};

export default Contacts;
