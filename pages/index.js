import Head from 'next/head'
import { useState, useContext, useEffect } from 'react'
import {DataContext} from '../store/GlobalState'

import { getData } from '../utils/fetchData'
import ProductItem from '../components/product/ProductItem'
import filterSearch from '../utils/filterSearch'
import {useRouter} from 'next/router'
import Filter from '../components/Filter'
import MessengerCustomerChat from '../components/messenger/MessengerCustomerChat'

const Home = (props) => {
  const [products, setProducts] = useState(props.products)

  const [isCheck, setIsCheck] = useState(false)
  const [page, setPage] = useState(1)
  const router = useRouter()

  const {state, dispatch} = useContext(DataContext)
  const {auth} = state

  useEffect(() => {
    var chatbox = document?.getElementById("fb-customer-chat");
  chatbox.setAttribute("page_id", "105674915691187");
  chatbox.setAttribute("attribution", "biz_inbox");


  window.fbAsyncInit = function () {
    FB.init({
      xfbml: true,
      version: "v15.0",
    });
  };

  (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "facebook-jssdk");
  }, []);

  useEffect(() => {
    setProducts(props.products)
  },[props.products])

  useEffect(() => {
    if(Object.keys(router.query).length === 0) setPage(1)
  },[router.query])

  const handleCheck = (id) => {
    products.forEach(product => {
      if(product._id === id) product.checked = !product.checked
    })
    setProducts([...products])
  }

  const handleCheckALL = () => {
    products.forEach(product => product.checked = !isCheck)
    setProducts([...products])
    setIsCheck(!isCheck)
  }

  const handleDeleteAll = () => {
    let deleteArr = [];
    products.forEach(product => {
      if(product.checked){
          deleteArr.push({
            data: '', 
            id: product._id, 
            title: 'Delete all selected products?', 
            type: 'DELETE_PRODUCT'
          })
      }
    })

    dispatch({type: 'ADD_MODAL', payload: deleteArr})
  }

  const handleLoadmore = () => {
    setPage(page + 1)
    filterSearch({router, page: page + 1})
  }

  return(
    <div className="home_page">
      <Head>
        <title>Home Page</title>
      </Head>

      <Filter state={state} />

      <MessengerCustomerChat pageId="100087553510087" appId="5701547326574526"/>

      {
        auth.user && auth.user.role === 'admin' &&
        <div className="delete_all btn btn-danger mt-2" style={{marginBottom: '-10px'}}>
          <input type="checkbox" checked={isCheck} onChange={handleCheckALL}
          style={{width: '25px', height: '25px', transform: 'translateY(8px)'}} />

          <button className="btn btn-danger ml-2"
          data-toggle="modal" data-target="#exampleModal"
          onClick={handleDeleteAll}>
            DELETE ALL
          </button>
        </div>
      }

      <div className="products">
        {
          products.length === 0 
          ? <h2>No Products</h2>

          : products.map(product => (
            <ProductItem key={product._id} product={product} handleCheck={handleCheck} />
          ))
        }
      </div>
      
      {
        props.result < page * 6 ? ""
        : <button className="btn btn-outline-info d-block mx-auto mb-4"
        onClick={handleLoadmore}>
          Load more
        </button>
      }

      {/* <!-- Messenger Plugin chat Code --> */}
      <div id="fb-root"></div>

      {/* <!-- Your Plugin chat code --> */}
      <div id="fb-customer-chat" class="fb-customerchat"></div>

      <main>
        <h1 className="title">
          Youngz <a href="https://nextjs.org">Messenger</a>
        </h1>

        <p className="description">
          Get started by your account FaceBook
        </p>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}


export async function getServerSideProps({query}) {
  const page = query.page || 1
  const category = query.category || 'all'
  const sort = query.sort || ''
  const search = query.search || 'all'

  const res = await getData(
    `product?limit=${page * 6}&category=${category}&sort=${sort}&title=${search}`
  )
  // server side rendering
  return {
    props: {
      products: res.products,
      result: res.result
    }, // will be passed to the page component as props
  }
}

export default Home