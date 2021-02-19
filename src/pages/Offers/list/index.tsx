import moment from 'moment';
import { PlusOutlined } from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {
  Button,
  Card,
  Divider,
  Popconfirm, Table
} from 'antd';
import React, { FC, useEffect } from 'react';
import { connect, FormattedMessage, history, Link, useIntl } from 'umi';
import { StateType } from './model';
import styles from './style.less';
interface BasicListProps {
  offersList: StateType;
  dispatch: any;
  loading: boolean;
}

export const SchoolsList: FC<BasicListProps> = (props) => {
  const intl = useIntl();
  const {
    loading,
    dispatch,
    offersList: { list },
  } = props;

  useEffect(() => {
    dispatch({
      type: 'offersList/fetch',
    });
  }, [1]);

  const onNewOfferClick = () => {
    history.push('/offers/new');
  };

  const deleteItem = (id: string) => {
    dispatch({
      type: 'offersList/delete',
      payload: { id },
    });
  };

  const columns = [
    {
      title: intl.formatMessage({ id: 'lists.header.advertiser_name' }),
      dataIndex: 'advertiser_name',
      width: '15%',
      key: 'advertiser_name',
    },
    {
      title: intl.formatMessage({ id: 'lists.header.description' }),
      dataIndex: 'description',
      width: '15%',
      key: 'description',
    },
    {
      title: intl.formatMessage({ id: 'lists.header.status' }),
      dataIndex: 'status',
      width: '15%',
      // key: 'status',
      render: (text:string, record:any) => {
        if(!record.status){
          return;
        }
        return `${moment(record.starts_at)}`
      }
    },
    {
      title: intl.formatMessage({ id: 'lists.header.starts_at' }),
      dataIndex: 'starts_at',
      width: '10%',
      render: (text:string, record:any) => {
        if(!record.starts_at){
          return;
        }
        return `${moment(record.starts_at)}`
      }
    },
    {
      title: intl.formatMessage({ id: 'lists.header.ends_at' }),
      dataIndex: 'ends_at',
      width: '10%',
      render: (text:string, record:any) => {
        if(!record.ends_at){
          return;
        }
        return `${moment(record.ends_at)}`
      }
    },
    {
      title: intl.formatMessage({ id: 'lists.header.url' }),
      dataIndex: 'url',
      width: '10%',
      key: 'url',
    },
    {
      title: intl.formatMessage({ id: 'lists.header.actions' }),
      key: 'actions',
      width: '15%',
      render: (text: string, record: any) => (
        <span>
          <Link to={`offers/${record.id}`}><FormattedMessage id='app.edit' /></Link>
          <Divider type="vertical" />
          <Popconfirm
            placement="leftTop"
            title={intl.formatMessage({ id: 'questions.delete.record' })}
            onConfirm={() => deleteItem(record.id)}
            okText={intl.formatMessage({ id: 'app.yes' })}
            cancelText={intl.formatMessage({ id: 'app.no' })}
          >
            <a href="#"><FormattedMessage id='app.delete' /></a>
          </Popconfirm>
        </span>
      ),
    },
  ];
 
  return (
    <PageHeaderWrapper title={intl.formatMessage({ id: 'menu.offers' })}>
      <div className={styles.classesList}>
        <Card
          bordered={false}
          style={{ marginTop: 24, paddingTop: 15 }}
          bodyStyle={{ padding: '0 32px 40px 32px' }}
        >
          <Button
            type="dashed"
            onClick={onNewOfferClick}
            style={{ width: '100%', marginBottom: 15 }}
            icon={<PlusOutlined />}
          >
            {intl.formatMessage({ id: 'buttons.new.offer' })}
          </Button>
          <Table
            rowKey={record => record.id}
            loading={loading}
            columns={columns}
            dataSource={list}
            pagination={{ pageSize: 10 }}
          />
        </Card>
      </div>
    </PageHeaderWrapper>
  );
};

export default connect(
  ({
    offersList,
    loading,
  }: {
    offersList: StateType;
    loading: {
      models: { [key: string]: boolean };
    };
  }) => ({
    offersList,
    loading: loading.models.offersList,
  }),
)(SchoolsList);
