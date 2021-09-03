import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import Link from "next/link";
import { withRouter } from "next/router";

import { isObjEmpty } from "../../helpers/utilityFunctions/isObjEmpty";

const mapStateToProps = state => ({
  breadCrumb: state.breadCrumb,
  flattenedCategs: state.productCategories.flattenedCategories
});

const mapDispatchToProps = dispatch => ({
  resetProductCategory: () => dispatch(actions.resetBreadCrumb()),
  fetchSetProductCategories: () => dispatch(actions.fetchSetProductCategories())
});

const Breadcrumb = connect(mapStateToProps, mapDispatchToProps)(withRouter(props => {
  const { flattenedCategs, router, breadCrumb } = props;
  
  let breadCrumbElems = [];

  if (router.pathname !== "/") {
    breadCrumbElems.push(
      <Link href="/" key="0">
        Главная   
      </Link>
    )
    
    if (flattenedCategs.length && !isObjEmpty(router.query)) {
      let found = undefined;
      if (breadCrumb.productCategory.id !== null) {
        found = flattenedCategs.find(elem => elem.id === breadCrumb.productCategory.id)
      } else found = flattenedCategs.find(elem => elem.slug === router.query.id)
      
      if (found !== undefined) {
        if (found.hasOwnProperty("parentId")){
          const parentObj = flattenedCategs.find(elem => elem.id === found.parentId)

          breadCrumbElems.push(
            <Link
              href={{
                pathname:"/shop/[id]",
                query: { category_id: parentObj.id }
              }}
              as={`/shop/${parentObj.slug}`}
              key={parentObj.name}
              >
              <a>{parentObj.name}</a>
            </Link>
          ) 
          breadCrumbElems.push(
            <Link
              href={{
                pathname:"/shop/[id]",
                query: { category_id: found.id }
              }}
              as={`/shop/${found.slug}`}
              key={found.name}
              >
              <a>{found.name}</a>
            </Link>
          )
        } else {
          breadCrumbElems.push(
            <Link
              href={{
                pathname:"/shop/[id]",
                query: { category_id: found.id }
              }}
              as={`/shop/${found.slug}`}
              key={found.name}
              >
              <a>{found.name}</a>
            </Link>
          )
        }
      } 
    } else {
      let linkText = ''

      switch (router.pathname) {
        case '/favourites':
          linkText = "Избранные"
          break;
        case '/compare':
          linkText = "Сравнение"
          break;
        case '/cart':
          linkText = "Корзина"
          break;
        case '/login':
          linkText = "Авторизация"
          break;
        case '/register':
          linkText = "Регистрация"
          break;
        case '/user':
          linkText = "Личный кабинет"
          break;
        case '/about':
          linkText = "О нас"
          break;
        case '/about/policy':
          linkText = "Политика конфиденциальности"
          break;
        case '/rules':
          linkText = "Правила пользования сайтом"
          break;
        case '/contact':
          linkText = "Контакты"
          break;
        case '/payment':
          linkText = "Доставка и оплата"
          break;
        case '/return':
          linkText = "Возврат или Обмен"
          break;
        case '/constructor':
          linkText = "Сборка ПК"
          break;
        default:
          break;
      }

      breadCrumbElems.push(
        <Link href={router.pathname} key={router.pathname}>
           <a>{linkText}</a>
        </Link>
      )
    }
  }

  return (
    <>
      {breadCrumbElems.length ? 
     <div className="bg-gray-13 bg-md-transparent">
     <div className="container">
         <div className="my-md-3">
             <nav aria-label="breadcrumb">
               
              <BreadcrumbList>
                {breadCrumbElems}
              </BreadcrumbList>
           
                      </nav>
                  </div>
                 
              </div>
          </div> : null
      }
    </>
  )
}))

export default Breadcrumb;

const BreadcrumbItem = ({ children, ...props }) => (
  <li className="breadcrumb-item flex-shrink-0 flex-xl-shrink-1" {...props}>
    {children}
  </li>
)

const BreadcrumbSeparator = ({ children, ...props }) => (
  <li className='breadcrumb-separator' {...props}>
    {children}
  </li>
)

const BreadcrumbList = ({ separator = '/', ...props }) => {
  let children = React.Children.toArray(props.children)

  children = children.map((child, index) => (
    <BreadcrumbItem key={`breadcrumb_item${index}`}>{child}</BreadcrumbItem>
  ))

  const lastIndex = children.length - 1

  children = children.reduce((acc, child, index) => {
    const notLast = index < lastIndex
    if (notLast) {
      acc.push(
        child,
        <BreadcrumbSeparator key={`breadcrumb_sep${index}`}>
          {separator}
        </BreadcrumbSeparator>,
      )
    } else {
      acc.push(child)
    }
    return acc
  }, [])

  return   <ol className="breadcrumb mb-3 flex-nowrap flex-xl-wrap overflow-auto overflow-xl-visble">{children}</ol>
}

