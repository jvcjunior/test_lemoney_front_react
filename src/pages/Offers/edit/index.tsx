// import { InfoCircleOutlined } from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card } from 'antd';
import React, { FC, useEffect } from 'react';
import { connect, FormattedMessage } from 'umi';
import SchoolForm from '../commomForm';
import { StateType } from '../model';

interface BasicFormProps {
  companySchoolForm: StateType;
  submitting: boolean;
  loading: boolean;
  dispatch: any;
  match: any;
}

const EditSchoolForm: FC<BasicFormProps> = (props) => {
  const {
    submitting,
    dispatch,
    match
  } = props;
  
  useEffect(() => {
    dispatch({
      type: 'companySchoolForm/fetchSchool',
      payload: match.params.schoolId
    });
  }, [1]);
  

  const onFinish = (values: { [key: string]: any }) => {
    dispatch({
      type: 'companySchoolForm/editSchool',
      payload: {
        schoolId: match.params.schoolId,
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
    content={<FormattedMessage id="form.edit.schools.subtitle" />}>
      <Card bordered={false}>
        <SchoolForm 
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
    companySchoolForm,
    loading,
  }: {
    companySchoolForm: StateType;
    loading: {
      models: { [key: string]: boolean };
      effects: { [key: string]: boolean };
    };
  }) => ({
    companySchoolForm,
    loading: loading.models.companySchoolForm,
    submitting: loading.effects['companySchoolForm/editSchool'],
  }),
)(EditSchoolForm);
