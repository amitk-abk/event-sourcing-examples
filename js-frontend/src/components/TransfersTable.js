/**
 * Created by andrew on 3/22/16.
 */
import React from "react";
import Spinner from "react-loader";
import * as BS  from "react-bootstrap";
import TimeAgo from 'react-timeago';

import { Money } from './Money';
import AccountInfo from './AccountInfo';

export class TransfersTable extends React.Component {
  render() {
    const { loading, data, errors } = this.props;

    if (loading) {
      return (<h2><Spinner ref="spinner" loaded={false} /> Loading..</h2>);
    }

    if (Object.keys(errors).length) {
      return (<div className="text-danger">Errors..</div>);
    }

    const transfers = data.length ? data.map(({
      amount,
      fromAccountId,
      toAccountId,
      transactionId,
      description = '',
      date = null,
      status = ''
    }, idx) => (<tr key={idx}>
      <td><TimeAgo date={date} /></td>
      <td><AccountInfo accountId={ fromAccountId } /></td>
      <td><AccountInfo accountId={ toAccountId } /></td>
      <td><Money amount={ amount } /></td>
      <td>{ description || '[No description]'}</td>
      <td>{ status || '&mdash;' }</td>
    </tr>)) : (<tr>
      <td colSpan={6}>No transfers for this account just yet.</td>
    </tr>);


    return (
      <BS.Table striped bordered condensed hover>
        <thead>
        <tr>
          <th>Date</th>
          <th>Transfer Out</th>
          <th>Transfer In</th>
          <th>Amount</th>
          <th>Description</th>
          <th>Status</th>
        </tr>
        </thead>
        <tbody>
        { transfers }
        </tbody>
      </BS.Table>
    );
  }
}