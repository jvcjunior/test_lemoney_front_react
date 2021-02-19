import { Card } from 'antd';
import { connect, FormattedMessage } from 'umi';
import React, { FC } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import OfferForm from '../commomForm';

interface BasicFormProps {
  offerForm: any;
  submitting: boolean;
  dispatch: any;
}

const CreateOfferForm: FC<BasicFormProps> = (props) => {
  const {
    submitting,
    dispatch,
  } = props;

  const onFinish = (values: { [key: string]: any }) => {
    dispatch({
      type: 'offerForm/addOffer',
      payload: values
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
  <PageHeaderWrapper 
    title={<FormattedMessage id="form.create.Offers.title"/>} 
    content={<FormattedMessage id="form.create.Offers.subtitle" />}>
      <Card bordered={false}>
        <OfferForm {...props} 
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
    offerForm: any;
    loading: {
      models: { [key: string]: boolean };
      effects: { [key: string]: boolean };
    };
  }) => ({
    offerForm,
    loading: loading.models.offerForm,
    submitting: loading.effects['offerForm/addOffer'],
  }),
)(CreateOfferForm);
