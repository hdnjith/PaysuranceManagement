import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Claim } from './components/Claim/Create';
import { ClaimIndex } from './components/Claim/index';
import { InsuaranceCompany } from './components/MasterData/InsuaranceCompany/Create';
import { InsuaranceCompanyIndex } from './components/MasterData/InsuaranceCompany/index';
import { InsuaranceCompanyEdit } from './components/MasterData/InsuaranceCompany/Edit';

import { Product } from './components/MasterData/Product/Create';
import { ProductIndex } from './components/MasterData/Product/index';
import { ProductEdit } from './components/MasterData/Product/Edit';

import { Hospital } from './components/MasterData/Hospital/Create';
import { HospitalIndex } from './components/MasterData/Hospital/index';
import { HospitalEdit } from './components/MasterData/Hospital/Edit';

import { Ailment } from './components/MasterData/Ailment/Create';
import { AilmentIndex } from './components/MasterData/Ailment/index';
import { AilmentEdit } from './components/MasterData/Ailment/Edit';

import { Customer } from './components/MasterData/Customer/Create';
import { CustomerIndex } from './components/MasterData/Customer/index';
import { CustomerMemberIndex } from './components/MasterData/Customer/Memberindex';
import { MemberViewIndex } from './components/MasterData/Customer/MemberViewIndex';
import { CustomerEdit } from './components/MasterData/Customer/Edit';
import { CustomerBulkUpload } from './components/MasterData/CustomerBulkUpload/Create';

import { Policy } from './components/MasterData/Policy/Create';
import { PolicyIndex } from './components/MasterData/Policy/index';
import { PolicyEdit } from './components/MasterData/Policy/Edit';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
            <Route path='/claim' component={ Claim } />
            <Route path='/counter1' component={ClaimIndex} />
            <Route path='/insuaranceCompany/create' component={InsuaranceCompany} />
            <Route path='/insuaranceCompany/index' component={InsuaranceCompanyIndex} />
            <Route path='/insuaranceCompany/Edit/:id' component={InsuaranceCompanyEdit} />

            <Route path='/product/create' component={Product} />
            <Route path='/product/index' component={ProductIndex} />
            <Route path='/product/Edit/:id' component={ProductEdit} />


            <Route path='/hospital/create' component={Hospital} />
            <Route path='/hospital/index' component={HospitalIndex} />
            <Route path='/hospital/Edit/:id' component={HospitalEdit} />

            <Route path='/ailment/create' component={Ailment} />
            <Route path='/ailment/index' component={AilmentIndex} />
            <Route path='/ailment/Edit/:id' component={AilmentEdit} />

            <Route path='/customer/create' component={Customer} />
            <Route path='/customer/index' component={CustomerIndex} />
            <Route path='/customer/memberindex' component={CustomerMemberIndex} />
            <Route path='/customer/MemberViewIndex/:id' component={MemberViewIndex} />
            <Route path='/customer/Edit/:id' component={CustomerEdit} />

            <Route path='/customerbulk/create/:id' component={CustomerBulkUpload} />

            <Route path='/policy/create' component={Policy} />
            <Route path='/policy/index' component={PolicyIndex} />
            <Route path='/policy/Edit/:id' component={PolicyEdit} />


            
      </Layout>
    );
  }
}
