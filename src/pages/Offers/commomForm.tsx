import moment from 'moment';
import { Button, DatePicker, Form, Input, Switch } from 'antd';
import React, { FC, useEffect } from 'react';
import { formatMessage, FormattedMessage, history, useIntl } from 'umi';

const FormItem = Form.Item;
interface BasicFormProps {
  submitting: boolean;
  onFinish: any;
  onFinishFailed: any;
  classObj?: any;
  offerForm?: any;
  dispatch?: any;
}

const OfferForm: FC<BasicFormProps> = (props) => {
  const {
    submitting,
    onFinish,
    onFinishFailed,
    offerForm,
    dispatch,
  } = props;

  const intl = useIntl();
  const [form] = Form.useForm();

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
      md: { span: 10 },
    },
  };

  const submitFormLayout = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 10, offset: 7 },
    },
  };

  if (offerForm.offer) {
    form.setFieldsValue({ 
      ...offerForm.offer,
      //@ts-ignore
      starts_at: moment(offerForm.offer.starts_at),
      ends_at: offerForm.offer.ends_at ? moment(offerForm.offer.ends_at) : null
     });
  }

  useEffect(() => form.resetFields(), [1]);

  const cancelButtonClicked = () => {
    history.goBack();
  }

  return (
    <Form
      style={{ marginTop: 8 }}
      form={form}
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      hideRequiredMark={false}
    >
      <FormItem
        {...formItemLayout}
        label={<FormattedMessage id="form.advertiser_name.label" />}
        name="advertiser_name"
        rules={[
          {
            required: true,
            message: formatMessage({ id: 'validation.advertiser_name.required' }),
          },
        ]}
      >
        <Input placeholder={formatMessage({ id: 'form.advertiser_name.placeholder' })} />
      </FormItem>

      {/* email */}
      <FormItem
        {...formItemLayout}
        label={<FormattedMessage id="form.offer.url.label" />}
        name="url"
        rules={[
          {
            required: true,
            message: formatMessage({ id: 'validation.url.required' }),
          },
          {
            type: "url",
            message: formatMessage({ id: 'validation.url.required' }),
          },
        ]}
      >
        <Input placeholder={formatMessage({ id: 'form.offer.url.placeholder' })} />
      </FormItem>

      <Form.Item 
        {...formItemLayout}
        label={<FormattedMessage id="form.offer.description.label" />}
        name="description"
        rules={[
          {
            required: true,
            message: formatMessage({ id: 'validation.description.required' }),
          },
        ]}>
        <Input.TextArea />
      </Form.Item>

      <Form.Item  {...formItemLayout}
        label={<FormattedMessage id="form.offer.starts_at.label" />}
        name="starts_at"
        rules={[
          {
            required: true,
            message: formatMessage({ id: 'validation.starts_at.required' }),
          },
        ]}>
        <DatePicker />
      </Form.Item>

      <Form.Item  {...formItemLayout}
        label={<FormattedMessage id="form.offer.ends_at.label" />}
        name="ends_at">
        <DatePicker />
      </Form.Item>

      <Form.Item {...formItemLayout}
        label={<FormattedMessage id="form.offer.premium.label" />}
        name="premium" 
        valuePropName="checked">
        <Switch />
      </Form.Item>

      <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
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

export default OfferForm;
