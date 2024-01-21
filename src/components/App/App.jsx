import { GlobalStyle } from '../GlobalStyle';
import { nanoid } from 'nanoid';
import { Component } from 'react';
import ContactList from '../ContactList';

import Filter from '../Filter';
import Form from '../Form';

import { Container, H2, H1 } from './App.styled';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContacts = ({ name, number }) => {
    const { contacts } = this.state;

    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    contacts.find(contact => contact.name === name)
      ? alert(name + '   This contact already exists!')
      : this.setState(({ contacts }) => ({
          contacts: [newContact, ...contacts],
        }));
  };

  contactFilter = () => {
    const { contacts, filter } = this.state;
    const lowerRegister = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(lowerRegister)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(({ id }) => id !== contactId),
    }));
  };

  filterByName = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  render() {
    const { filter } = this.state;
    return (
      <>
        <Container>
          <H1>Phonebook</H1>
          <Form onSubmit={this.addContacts} />

          <H2>Contacts</H2>
          <Filter value={filter} onChange={this.filterByName} />
          <ContactList
            contacts={this.contactFilter()}
            deleteContacts={this.deleteContact}
          />
        </Container>
        <GlobalStyle />
      </>
    );
  }
}
