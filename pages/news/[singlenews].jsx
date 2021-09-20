import Layout from "../../components/Layout/layout/layout.component";
import Head from "next/head";
import React from "react";
import OverlayComponent from "../../components/Layout/overlay/overlay.component";

function PostNews({ data, setProductCategory, isLoading, locale }) {
  return (
    <>
      <Head>
        <title>{"Технический центр"}</title>
        <meta charset="UTF-8" />
        <meta name="description" content={"Технический центр"} />
        <meta name="keywords" content={"Технический центр"} />
          
        <meta
          name="google-site-verification"
          content="3kTZ1AFA-Ys6DV-oZgCXUqlfNqsP6r2YJ0mpAmcaL-k"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="icon"
          href="/static/assets/img/img/favicon.ico"
          type="image/x-icon"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="/static/assets/template/avtech/styles/product_responsive.css"
        />
      </Head>
      <div className="super_container">
        <OverlayComponent isLoading={isLoading} locale={locale}/>
        <div class={`pace ${isLoading ? "pace-active" : "pace-inactive"}`}>
          <div
            class="pace-progress"
            data-progress-text="100%"
            data-progress="99"
            style={{ transform: "translate3d(100%, 0px, 0px)" }}
          >
            <div class="pace-progress-inner"></div>
          </div>
          <div class="pace-activity"></div>
        </div>
        <div
          id={`preloader`}
          className={`preloader ${isLoading ? "" : "load_coplate"}`}
        >
          <div class="product_name">Bearings</div>
        </div>
        <Layout
          isLoading={isLoading}
          title={"Технический Центр"}
          pageInfo={["Главная", "Новости", "Технический Центр"]}
          locale={locale}
        >
          <>
            <section class="blog_details_area pt_200">
              <div class="container">
                <div class="blog_details_inner">
                  <div class="blog_d_top_text">
                    <h3>Мы запустили технический центр</h3>
                    <ul class="nav">
                      <li>
                        <a href="#">Опубликовано 1 месяц назад</a>
                      </li>
                      <li>
                        <a href="#">
                          Тег <span>Расширение</span>
                        </a>
                      </li>
                    </ul>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Dolorem, iusto.
                    </p>
                  </div>
                  <div class="single_blog_img">
                    {" "}
                    <img
                      class="img-fluid"
                      src="/static/assets/img/img/blog/single-blog-1.jpg"
                      alt=""
                    />
                  </div>
                  <div class="blog_d_bottom_text">
                    <h4>
                      Мы уверены что это поможет нам в реализации новых проектов
                    </h4>
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Commodi harum facilis quia unde similique, laudantium,
                      eaque dolor libero dolorem amet minus, nisi totam
                      laboriosam facere!
                    </p>
                    <blockquote class="blockquote">
                      {" "}
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Provident inventore cumque minima eius, ullam architecto
                      esse quaerat corrupti blanditiis repellendus!{" "}
                    </blockquote>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Itaque possimus magni nemo pariatur mollitia, explicabo
                      iste praesentium unde exercitationem temporibus corrupti
                      repellendus veritatis odit a debitis consequatur magnam.
                      Molestias veritatis quam soluta quasi, harum illo.
                      Adipisci consequuntur recusandae ab obcaecati similique
                      maiores error repellat sed.
                    </p>
                  </div>
                  <div class="conclusion_text">
                    <ul class="nav share_icon">
                      <li>Поделиться:</li>
                      <li>
                        <a href="#">
                          <i class="fab fa-facebook-f"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="fab fa-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="fab fa-linkedin-in"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div class="like_post">
                    <h2>Последние Новости</h2>
                    <div class="row justify-content-center">
                      <div class="col-md-4 col-sm-6">
                        <div class="cons_blog_item">
                          {" "}
                          <a href="#" class="img_hover">
                            {" "}
                            <img
                              src="/static/assets/img/img/blog/blog-1.jpg"
                              alt=""
                            />{" "}
                          </a>{" "}
                          <a href="single-blog.html">
                            <h3>
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit.
                            </h3>
                          </a>{" "}
                        </div>
                      </div>
                      <div class="col-md-4 col-sm-6">
                        <div class="cons_blog_item">
                          {" "}
                          <a href="#" class="img_hover">
                            {" "}
                            <img
                              src="/static/assets/img/img/blog/blog-2.jpg"
                              alt=""
                            />{" "}
                          </a>{" "}
                          <a href="single-blog.html">
                            <h3>
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit.
                            </h3>
                          </a>{" "}
                        </div>
                      </div>
                      <div class="col-md-4 col-sm-6">
                        <div class="cons_blog_item">
                          {" "}
                          <a href="#" class="img_hover">
                            {" "}
                            <img
                              src="/static/assets/img/img/blog/blog-3.jpg"
                              alt=""
                            />{" "}
                          </a>{" "}
                          <a href="single-blog.html">
                            <h3>
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit.
                            </h3>
                          </a>{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        </Layout>
      </div>
    </>
  );
}

export default PostNews;
