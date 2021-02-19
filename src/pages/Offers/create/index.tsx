import { Card } from 'antd';
import { connect, FormattedMessage } from 'umi';
import React, { FC } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import SchoolForm from '../commomForm';

interface BasicFormProps {
  companySchoolForm: any;
  submitting: boolean;
  dispatch: any;
}

const CreateSchoolForm: FC<BasicFormProps> = (props) => {
  const {
    submitting,
    dispatch,
  } = props;

  const onFinish = (values: { [key: string]: any }) => {
    dispatch({
      type: 'companySchoolForm/addSchool',
      payload: values
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
  <PageHeaderWrapper 
    title={<FormattedMessage id="form.create.schools.title"/>} 
    content={<FormattedMessage id="form.create.schools.subtitle" />}>
      <Card bordered={false}>
        <SchoolForm {...props} 
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
    companySchoolForm,
    loading,
  }: {
    companySchoolForm: any;
    loading: {
      models: { [key: string]: boolean };
      effects: { [key: string]: boolean };
    };
  }) => ({
    companySchoolForm,
    loading: loading.models.companySchoolForm,
    submitting: loading.effects['companySchoolForm/addSchool'],
  }),
)(CreateSchoolForm);
