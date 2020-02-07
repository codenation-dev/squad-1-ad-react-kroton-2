import React, { useState } from 'react';

export default function ForgotPassword() {
  return (
    <div>
      <p>Password Retrieve</p>
      <label>E-mail</label>
      <input placeholder="E-mail"></input>
      <br></br>
      <button>Retrieve</button>
    </div>
  );
}
