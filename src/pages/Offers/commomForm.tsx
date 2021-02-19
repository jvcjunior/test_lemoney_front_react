// import { InfoCircleOutlined } from '@ant-design/icons';
import FormSubHeader from "@/components/FormSubHeader";
import { SolutionOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import React, { FC, useEffect } from 'react';
import { formatMessage, FormattedMessage, history, useIntl } from 'umi';

const FormItem = Form.Item;
const { Option } = Select;
interface BasicFormProps {
  submitting: boolean;
  onFinish: any;
  onFinishFailed: any;
  classObj?: any;
  companySchoolForm?: any;
  dispatch?: any;
}

const SchoolForm: FC<BasicFormProps> = (props) => {
  const {
    submitting,
    onFinish,
    onFinishFailed,
    companySchoolForm,
    dispatch,
  } = props;

  const intl = useIntl();
  const [form] = Form.useForm();

  if (companySchoolForm.school) {
    form.setFieldsValue({ ...companySchoolForm.school });
  }

  // useEffect(() => {
  //   dispatch({
  //     type: 'companySchoolForm/fetchCompanies',
  //   });
  // }, [1]);
 
  useEffect(() => form.resetFields(), [1]);

  const cancelButtonClicked = () => {
    history.goBack();
  }

  return (
    <Form
      style={{ marginTop: 8 }}
      layout="vertical"
      form={form}
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      hideRequiredMark={false}
    >
      <FormSubHeader icon={<SolutionOutlined />}
        title={intl.formatMessage({ id: "form.school.data.title" })} />

      <Row gutter={16}>
        <Col xs={24} md={12} lg={8}>
          <FormItem
            label={<FormattedMessage id="form.school.name.label" />}
            name="name"
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'validation.name.required' }),
              },
            ]}
          >
            <Input placeholder={formatMessage({ id: 'form.school.name.placeholder' })} />
          </FormItem>
        </Col>
        <Col xs={24} md={12} lg={8}>
          {/* email */}
          <FormItem
            label={<FormattedMessage id="form.school.email.label" />}
            name="email"
            rules={[
              {
                type: 'email',
                message: formatMessage({ id: 'validation.email.wrong-format' }),
              },
              {
                required: true,
                message: formatMessage({ id: 'validation.email.required' }),
              },
            ]}
          >
            <Input placeholder={formatMessage({ id: 'form.school.email.placeholder' })} />
          </FormItem>
        </Col>
        <Col xs={24} md={12} lg={8}>
          <FormItem
            label={<FormattedMessage id="form.school.razaoSocial.label" />}
            name="razaoSocial"
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'validation.razaoSocial.required' }),
              },
            ]}
          >
            <Input placeholder={formatMessage({ id: 'form.school.razaoSocial.placeholder' })} />
          </FormItem>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} md={12} lg={8}>
          {/* cnpj */}
          <FormItem
            label={<FormattedMessage id="form.school.cnpj.label" />}
            name="cnpj"
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'validation.cnpj.required' }),
              },
            ]}
          >
            <Input placeholder={formatMessage({ id: 'form.school.cnpj.placeholder' })} />
          </FormItem>
        </Col>
        <Col xs={24} md={12} lg={8}>
          {/* inscricaoEstadual */}
          <FormItem
            label={<FormattedMessage id="form.school.inscricaoEstadual.label" />}
            name="inscricaoEstadual"
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'validation.inscricaoEstadual.required' }),
              },
            ]}
          >
            <Input placeholder={formatMessage({ id: 'form.school.inscricaoEstadual.placeholder' })} />
          </FormItem>
        </Col>
        <Col xs={24} md={12} lg={8}>
          {/* phone */}
          <FormItem
            label={<FormattedMessage id="form.phone.label" />}
            name="phone"
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'validation.phone.required' }),
              },
            ]}
          >
            <Input placeholder={formatMessage({ id: 'form.phone.placeholder' })} />
          </FormItem>
        </Col>
      </Row>

      <FormSubHeader icon={<SolutionOutlined />} title={intl.formatMessage({ id: "form.school.address.title" })} />

      <Row gutter={16}>
        <Col xs={24} md={12} lg={8}>
          {/* streetName */}
          <FormItem
            label={<FormattedMessage id="form.streetName.label" />}
            name="streetName"
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'validation.streetName.required' }),
              },
            ]}
          >
            <Input placeholder={formatMessage({ id: 'form.streetName.placeholder' })} />
          </FormItem>
        </Col>
        <Col xs={24} md={12} lg={4}>
          {/* streetNumber */}
          <FormItem
            label={<FormattedMessage id="form.streetNumber.label" />}
            name="streetNumber"
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'validation.streetNumber.required' }),
              },
            ]}
          >
            <Input placeholder={formatMessage({ id: 'form.streetNumber.placeholder' })} />
          </FormItem>
        </Col>
        <Col xs={24} md={12} lg={12}>
          {/* complement */}
          <FormItem
            label={<FormattedMessage id="form.complement.label" />}
            name="complement"
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'validation.complement.required' }),
              },
            ]}
          >
            <Input placeholder={formatMessage({ id: 'form.complement.placeholder' })} />
          </FormItem>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} md={12} lg={8}>
          {/* neighborhood */}
          <FormItem
            label={<FormattedMessage id="form.neighborhood.label" />}
            name="neighborhood"
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'validation.neighborhood.required' }),
              },
            ]}
          >
            <Input placeholder={formatMessage({ id: 'form.neighborhood.placeholder' })} />
          </FormItem>
        </Col>
        <Col xs={24} md={12} lg={4}>
          {/* cep */}
          <FormItem
            label={<FormattedMessage id="form.school.cep.label" />}
            name="cep"
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'validation.cep.required' }),
              },
            ]}
          >
            <Input placeholder={formatMessage({ id: 'form.school.cep.placeholder' })} />
          </FormItem>
        </Col>
        <Col xs={24} md={12} lg={12}>
        </Col>
      </Row>

      {/* city */}
      {/* <FormItem
        {...formItemLayout}
        label={<FormattedMessage id="form.city.label" />}
        name="city"
        rules={[
          {
            required: true,
            message: formatMessage({ id: 'validation.city.required' }),
          },
        ]}
      >
        <Input placeholder={formatMessage({ id: 'form.city.placeholder' })} />
      </FormItem> */}

      {/* state */}
      {/* <FormItem
        {...formItemLayout}
        label={<FormattedMessage id="form.state.label" />}
        name="state"
        rules={[
          {
            required: true,
            message: formatMessage({ id: 'validation.state.required' }),
          },
        ]}
      >
        <Input placeholder={formatMessage({ id: 'form.state.placeholder' })} />
      </FormItem> */}

      {/* country */}
      {/* <FormItem
        {...formItemLayout}
        label={<FormattedMessage id="form.country.label" />}
        name="country"
        rules={[
          {
            required: true,
            message: formatMessage({ id: 'validation.country.required' }),
          },
        ]}
      >
        <Input placeholder={formatMessage({ id: 'form.country.placeholder' })} />
      </FormItem> */}

      <FormItem style={{ marginTop: 32 }}>
        <Button type="primary" htmlType="submit" loading={submitting || false}>
          <FormattedMessage id="form.save" />
        </Button>
        <Button style={{ marginLeft: 8 }} onClick={cancelButtonClicked}>
          <FormattedMessage id="form.cancel" />
        </Button>
      </FormItem>
    </Form>
  );
};

export default SchoolForm;
