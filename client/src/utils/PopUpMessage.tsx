import React, { useEffect, useMemo, useState } from 'react';
import ErrorAlert from '../components/ErrorAlert';

export default function PopUpMessage({ message: msg }) {
  const [showMsg, setShowMsg] = useState(false);
  // const [timeoutId, setTimeoutId] = useState(0);
  // const msg = props?.msg;
  useEffect(() => {
    setShowMsg(true);
  }, [msg]);
  // const handleError = () => {
  // setShowMsg(true);
  // //console.log('hi');
  // if (showMsg) clearTimeout(timeoutId);
  setTimeout(() => {
    setShowMsg(false);
  }, 5000);

  return showMsg && msg ? <ErrorAlert message={msg} /> : <></>;
}
