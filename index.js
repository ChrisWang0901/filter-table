import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Table, Button, Space } from 'antd';

const data = [
  {
    key: '1',
    sector: 'Energy',
    subSector:'Energy',
    value: 10
  },
 {
    key: '2',
    sector: 'Materials',
    subSector:'Materials',
    value: 5
  },
  {
    key: '3',
    sector: 'Financials',
    subSector:'Banks',
    value: 10
  },
  {
    key: '4',
    sector: 'Consumer Discretionary',
    subSector:'Consumer Services',
    value: 10
  },
];

class App extends React.Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
  };

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  clearFilters = () => {
    this.setState({ filteredInfo: null });
  };

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  setValSort = () => {
    this.setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'value',
      },
    });
  };

  render() {
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: 'Sector',
        dataIndex: 'sector',
        key: 'sector',
        filters: [
          { text: 'Energy', value: 'Energy' },
          { text: 'Financials', value: 'Financials' },
          { text: 'Materials', value: 'Materials' },
        ],
        filteredValue: filteredInfo.sector || null,
        onFilter: (value, record) => record.sector.includes(value),
        sorter: (a, b) => a.sector > b.sector,
        sortOrder: sortedInfo.columnKey === 'sector' && sortedInfo.order,
        ellipsis: true,
      },
      
      {
        title: 'Sub-Sector',
        dataIndex: 'subSector',
        key: 'subSector',
        filters: [
           { text: 'Energy', value: 'Energy' },
          { text: 'Financials', value: 'Financials' },
          { text: 'Materials', value: 'Materials' },
          { text: 'Consumer Services', value: 'Consumer Services' },
        ],
        filteredValue: filteredInfo.subSector || null,
        onFilter: (value, record) => record.subSector.includes(value),
        sorter: (a, b) => a.subSector > b.subSector,
        sortOrder: sortedInfo.columnKey === 'subSector' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'Value',
        dataIndex: 'value',
        key: 'value',
        sorter: (a, b) => a.value - b.value,
        sortOrder: sortedInfo.columnKey === 'value' && sortedInfo.order,
        ellipsis: true,
      },
    ];
    return (
      <>
        <Space style={{ marginBottom: 16 }}>
          <Button onClick={this.setValSort}>Sort value</Button>
          <Button onClick={this.clearFilters}>Clear filters</Button>
          <Button onClick={this.clearAll}>Clear filters and sorters</Button>
        </Space>
        <Table columns={columns} dataSource={data} onChange={this.handleChange} />
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('container'));