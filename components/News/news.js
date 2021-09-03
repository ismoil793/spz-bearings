import React from "react";
import Link from "next/link";
import axios from "axios";
import url from "../url";

export default class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newsPosts: [],
      first: 0,
      last: 10,
      meta: {
        currentPage: null,
        lastPage: null,
        perPage: 12
      },
      isLoading: true,
      loading: true,
      cartNumber: props.cartNumber
    };
  }

  componentDidMount() {
    this.getNews();
  }

  handlerCartNum = () => {
    this.props.grand();
  };

  handlerCompare = () => {
    this.props.compare();
  };

  getNews() {
    axios
      .get(`${url}/api/posts`, {
        params: {
          page: this.state.meta.currentPage,
          per_page: this.state.meta.perPage
        }
      })
      .then(response => {
        this.setState({
          isLoading: false,
          newsPosts: response.data.data,
          meta: {
            currentPage: 1,
            lastPage: response.data.meta.last_page,
            perPage: response.data.meta.per_page
          },
          loading: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  Pagination = e => {
    const meta = this.state.meta;
    meta.currentPage = e;

    this.setState({ meta: meta });

    this.getNews();
  };

  createPaging = () => {
    let paging = [];

    for (let i = 1; i <= this.state.meta.lastPage; i++) {
      paging.push(
        <li key={i} onClick={() => this.Pagination(i)}>
          <a href="#">{i}</a>
        </li>
      );
    }
    return paging.slice(this.state.first, this.state.last);
  };

  IncrementPage = e => {
    e.preventDefault();
    const meta = this.state.meta;

    if (meta.currentPage < meta.lastPage) {
      meta.currentPage = meta.currentPage + 1;
      this.setState({
        meta: meta,
        first: this.state.first + 10,
        last: this.state.last + 10
      });
    } else {
      this.setState({ meta: meta });
    }

    this.getNews();
  };

  DecrementPage = e => {
    const meta = this.state.meta;

    e.preventDefault();
    if (meta.currentPage > 1) {
      meta.currentPage = meta.currentPage - 1;
      this.setState({
        meta: meta,
        first: this.state.first - 10,
        last: this.state.last - 10
      });
    } else {
      this.setState({ meta: meta });
    }

    this.getNews();
  };

  render() {
    const { newsPosts, meta, isLoading } = this.state;

    return (
      <main id="content" role="main">
        <div className="container">
          <div className="row">
            <div className="col-xl-9 col-wd">
              <div className="min-width-1100-wd">
                {this.state.newsPosts
                  ? this.state.newsPosts.map(post => (
                      <article className="card mb-13 border-0">
                        <div className="row">
                          <div className="col-lg-4 mb-5 mb-lg-0">
                            <a href="single-blog-post.html" className="d-block">
                              <img
                                className="img-fluid min-height-250 object-fit-cover"
                                src={post.image.url}
                                alt="Image Description"
                              />
                            </a>
                          </div>
                          <div className="col-lg-8">
                            <div className="card-body p-0">
                              <h4 className="mb-3">
                                <a>{post.title}</a>
                              </h4>
                              <div className="mb-3 pb-3 border-bottom">
                                <div className="list-group list-group-horizontal flex-wrap list-group-borderless align-items-center mx-n0dot5">
                                  <a className="mx-0dot5 text-gray-5">
                                    {post.created_at}
                                  </a>
                                </div>
                              </div>
                              <p>{post.description_short}</p>
                              <div className="flex-horizontal-center">
                                <Link
                                  href={{
                                    pathname: "/news/[singlenews]"
                                  }}
                                  as={`/news/${post.slug}`}
                                >
                                  {" "}
                                  <a className="btn btn-soft-secondary-w mb-md-0 font-weight-normal px-5 px-md-4 px-lg-5">
                                    Прочитать
                                  </a>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))
                  : null}
              </div>
            </div>
            <div className="col-xl-3 col-wd">
              <aside className="mb-7">
                <div className="border-bottom border-color-1 mb-5">
                  <h3 className="section-title section-title__sm mb-0 pb-2 font-size-18">
                  Наша цель
                  </h3>
                </div>
                <p className="text-gray-90 mb-0">
Обеспечить Узбекистан и Центральную Азию лучшим ассортиментом пищевого оборудования.
                </p>
              </aside>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
