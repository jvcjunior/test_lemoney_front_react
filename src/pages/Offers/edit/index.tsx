// import { InfoCircleOutlined } from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card } from 'antd';
import React, { FC, useEffect } from 'react';
import { connect, FormattedMessage } from 'umi';
import OfferForm from '../commomForm';
import { StateType } from '../model';

interface BasicFormProps {
  offerForm: StateType;
  submitting: boolean;
  loading: boolean;
  dispatch: any;
  match: any;
}

const EditOfferForm: FC<BasicFormProps> = (props) => {
  const {
    submitting,
    dispatch,
    match
  } = props;
  
  useEffect(() => {
    dispatch({
      type: 'offerForm/fetchOffer',
      payload: match.params.id
    });
  }, [1]);
  

  const onFinish = (values: { [key: string]: any }) => {
    dispatch({
      type: 'offerForm/editOffer',
      payload: {
        offerId: match.params.id,
        data: values,
      },
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
  <PageHeaderWrapper 
    title={<FormattedMessage id="form.edit.schools.title"/>} 
    >
      <Card bordered={false}>
        <OfferForm 
          {...props} 
          submitting={submitting}
          onFinishFailed={onFinishFailed} 
          onFinish={onFinish}
        />
      </Card>
    </PageHeaderWrapper>
  );
};

export default connect(
  ({
    offerForm,
    loading,
  }: {
    offerForm: StateType;
    loading: {
      models: { [key: string]: boolean };
      effects: { [key: string]: boolean };
    };
  }) => ({
    offerForm,
    loading: loading.models.offerForm,
    submitting: loading.effects['offerForm/editOffer'],
  }),
)(EditOfferForm);
