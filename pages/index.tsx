import styles from '../styles/Home.module.css'
import {Card, Checkbox, DatePicker, Space, Table, Tag} from 'antd';

const {RangePicker} = DatePicker;

import {LaptopOutlined, NotificationOutlined, UserOutlined} from '@ant-design/icons';
import {Layout, Menu} from 'antd';
import React from 'react';
import {ColumnsType} from "antd/es/table";

const {Header, Content, Sider} = Layout;
const items1 = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  const key = String(index + 1);
  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,
    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

const App = () => (
  <Layout className={styles.main}>
    <Header className="header">
      <div className={styles.logo}/>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1}/>
    </Header>
    <Layout>
      <Sider width={200} className={styles.siteLayoutBackground}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{
            height: '100%',
            borderRight: 0,
          }}
          items={items2}
        />
      </Sider>
      <Layout style={{padding: '12px'}}>
        <div style={{backgroundColor: 'transparent', padding: 5, margin: 0, height: 'auto', lineHeight: 'auto'}}>
          <span style={{color: 'black'}}><strong>วันเริ่มต้น-วันสิ้นสุด</strong></span>&nbsp;&nbsp;
          <Space size={10}/>
          <RangePicker/>
        </div>
        <Layout>
          <Sider width={200} style={{backgroundColor: 'transparent', padding: 5}}>
            <Card size="small" title="แผนก" style={{}}>
              {
                ['aaa', 'bbb', 'ccc', 'ddd', 'eee', 'fff', 'ggg'].map(item =>
                  <div key={item} style={{padding: '5px 0'}}>
                    <Checkbox onChange={() => {
                    }}>
                      {item}
                    </Checkbox>
                  </div>
                )
              }
            </Card>
          </Sider>
          <Content style={{backgroundColor: 'transparent', padding: 5}}>
            <MyTable/>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </Layout>
);

function MyTable() {
  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, {tags}) => (
        <>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

  return (
    <Table columns={columns} dataSource={data} size="small"/>
  );
}

export default App;
