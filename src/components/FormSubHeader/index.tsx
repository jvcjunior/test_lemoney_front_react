import { Col, Divider, Row } from 'antd';
import React from 'react';

export interface NoticeIconProps {
  icon?: React.ReactNode;
  title: string;
}

const FormSubHeader: React.FC<NoticeIconProps> = (props) => {
  return (
    <Row gutter={16}>
    <Col>
      {props.icon}
    </Col>
    <Col>
      <span>{props.title}</span>
    </Col>
    <Divider />
  </Row>
  );
};

export default FormSubHeader;
