import React from 'react'
import { connect } from 'jeem'
import { Link, Route } from 'jeem/router'
import {
  Layout, Menu, Breadcrumb, Icon,
} from 'antd';

import './BasicLayout.less'
import routes from '../utils/MenuConfig'

const {
  Header, Content, Footer, Sider,
} = Layout;
const { SubMenu } = Menu;

const BasicBreadcrumb = (props) => {
  const { location } = props
  const pathNameArr = location.pathname.split('/').slice(1)
  const moduleNameArr = pathNameArr.slice(1)
  return (
    <Layout style={{ margin: '16px 0' }}>
      {
        pathNameArr.length > 2
          ? (
            <Breadcrumb>
              <Breadcrumb.Item href={`${pathNameArr[0]}`}>
                <Icon type="home" />
              </Breadcrumb.Item>
              {Object.keys(moduleNameArr).map(k => <Breadcrumb.Item key={k}>{moduleNameArr[k]}</Breadcrumb.Item>)}
            </Breadcrumb>
          )
          : (
            <Breadcrumb>
              <Breadcrumb.Item href={`${pathNameArr[0]}`}>
                <Icon type="home" />
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                {pathNameArr[1]}
              </Breadcrumb.Item>
            </Breadcrumb>
          )
      }
    </Layout>
  )
}

const RouteWithBasicLayout = ({ route, props }) => (
  <Content style={{ margin: '0 16px' }}>
    <BasicBreadcrumb {...props} />
    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
      {route.routes
        ? (
          route.routes.map((r, i) => (
            <Route path={r.path} key={i} component={r.component} />
          ))
        ) : (
          <Route path={route.path} component={route.component} />
        )}
    </div>
</Content>
)

const BasicLayout = (props) => {
  const { collapsed, onCollapse } = props
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        trigger={null}
      >
        <div className='logo' />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          {routes.map(route => (
            route.routes
              ? (
                <SubMenu
                  key={route.path}
                  title={<span><Icon type={route.icon} /><span>{route.name}</span></span>}
                >
                  {route.routes.map((r, i) => (
                    <Menu.Item key={i}>
                      <Link to={r.path}>
                        {r.name}
                      </Link>
                    </Menu.Item>
                  ))}
                </SubMenu>
              ) : (
              <Menu.Item key={route.path}>
                <Link to={route.path}>
                  <Icon type={route.icon} />
                  <span>{route.name}</span>
                </Link>
              </Menu.Item>
              )
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <Icon
            className='trigger'
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={() => onCollapse(!collapsed)}
          />
        </Header>
        {routes.map((route, index) => (
            <Route key={index} path={route.path} render={MenuProps => (
              <RouteWithBasicLayout key={index} route={route} props={MenuProps} />
            )} />
        ))}
        <Footer style={{ textAlign: 'center' }}>
          Jeem Pro ©2018 Created by Jeremy
        </Footer>
      </Layout>
    </Layout>
  )
}

const mapStateToProps = state => ({
  collapsed: state.global.collapsed,
})

const mapDispatchToProps = dispatch => ({
  onCollapse: collapsed => dispatch.global.onCollapse(collapsed),
})

export default connect(mapStateToProps, mapDispatchToProps)(BasicLayout)
