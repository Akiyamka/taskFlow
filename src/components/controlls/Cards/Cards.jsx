import React from 'react';
import { connect } from 'unistore/react';
import Card from '../Card/Card';
import action from '../../../store/actions';
import database from '../../../dataBase/db';
import './Cards.scss';

const Cards = (props) => {
  database.create.then((res) => {
    res.onsuccess = () => {
      props.addTask(res.result);
    };
  });

  return props.tasks.map((val) => {
    return <Card key={val.id} id={val.id} name={val.name} text={val.text} status={val.status} />;
  });
};

export default connect(
  'tasks',
  action
)(Cards);
