//import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';

import ModalHeader from "../../../components/modal/ModalHeader";
import ModalBody from "../../../components/modal/ModalBody";
import ModalFooter from "../../../components/modal/ModalFooter";

ChartJS.register(...registerables);

const ChartModal = ({chartData}) => {
  console.log(chartData);

  return (
    <>
      <ModalHeader>
        <h5>입고가 변동내역</h5>
      </ModalHeader>
      <ModalBody>
        <Line data={chartData} />
      </ModalBody>
      <ModalFooter>
      </ModalFooter>
    </>
  );
};

export default ChartModal;
 