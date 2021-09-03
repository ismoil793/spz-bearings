import React from "react";
import axios from "axios";
import "../../plugins/axios";
import MultiSelect from "@khanacademy/react-multi-select";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import url from "../url";

export default class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.option;
 
  }

  setFeatureValuesSelected(selectedValues, index) {
    let feats = this.state.features;
    feats[index].selectedValues = selectedValues;
    this.setState({ features: feats }, () => {
      this.FilterChanged();
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.brandID !== this.props.brandID) {
      this.getFilters();
    }
    if (prevProps.category !== this.props.category) {
      this.getFilters();
    }
  }

  componentDidMount = () => {
    this.getFilters();
  };

  getFilters() {
    axios
      .get(`${url}/api/filter/options`, {
        params: {
          brand_id: this.props.brandID ? this.props.brandID : null,
          category_id: this.props.category ? this.props.category : null,
          search: this.props.searching ? this.props.searching : null
        }
      })
      .then(response => {
        let features = response.data.features;
        for (let i = 0; i < features.length; i++) {
          let values = features[i].values;
          let newValues = [];
          for (let k = 0; k < values.length; k++) {
            newValues.push({ value: values[k].id, label: values[k].value });
          }
          features[i].values = newValues;
          features[i].selectedValues = [];
        }

        this.setState({
          brands: response.data.brands,
          features: features,
          max_price: response.data.price.max,
          min_price: response.data.price.min,
          value: {
            min: response.data.price.min,
            max: response.data.price.max
          }
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  selectedBrands(selectedBrands) {

    let selected=this.state.selectedBrands
    console.log('first push')
    selected.push(selectedBrands)
    console.log('selected')
    console.log(selected)
    this.setState({ selectedBrands: selected }, () => {
      this.FilterChanged();
    });
  }

  toggleFilter = () => {
    this.setState(prevState => ({
      show_filter: !prevState.show_filter
    }));

    this.props.onChange(this.state);
  };

  FilterChanged = () => {
    this.props.onChange(this.state);
  };

  render() {

    const {
      features,
      brands,
      min_price,
      max_price,
      selectedBrands,
      volume
    } = this.state;
    return (
      <>
        <div className="d-none d-xl-block col-xl-3 col-wd-2gdot5">
          <div className="mb-6">
            <div className="border-bottom border-color-1 mb-5">
              <h3 className="section-title section-title__sm mb-0 pb-2 font-size-18">
                Фильтры
              </h3>
            </div>
            <div className="range-slider">
              <h4 className="font-size-14 mb-3 font-weight-bold">Цена</h4>
              <div className="sidebar_section" style={{ marginTop: "20px" }}>
          
            <InputRange
              allowSameValues={true}
              // formatLabel={value => `${value} сум`}
              draggableTrack={false}
              step={1000}
              maxValue={max_price === null ? undefined : max_price}
              minValue={min_price === null ? undefined : min_price}
              value={this.state.value}
              onChange={value => {
                this.setState({ value });
              }}
              onChangeComplete={value => {
                this.FilterChanged();
              }}
            />
            
            <div className="row mt-3">
              <div className="col-6 pr-1">
                <div className="sidebar_subtitle mt-1">От:</div>
                <input
                  type="text"
                  className="input_field"
                  value={this.state.value.min}
                  name="min"
                  readOnly="readonly"
                  style={{width: "100%", height: "34px", paddingLeft: "12px", paddingRight: "12px", borderRadius: '5px'}}/>
              </div>
              <div className="col-6 pl-1">
                <div className="sidebar_subtitle mt-1">До:</div>
                <input
                  type="text"
                  className="input_field"
                  value={this.state.value.max}
                  name="max"
                  readOnly="readonly"
                  style={{width: "100%", height: "34px", paddingLeft: "12px", paddingRight: "12px", borderRadius: '5px'}}/>
              </div>
            </div>
          </div>
            
        

            </div>
            <div className="border-bottom pt-6 pb-4 mb-4">
              <h4 className="font-size-14 mb-3 font-weight-bold">Бренды</h4>

              {this.state.brands
                ? this.state.brands.map(brand => (
                    <div className="form-group d-flex align-items-center justify-content-between mb-2 pb-1">
                      <div className="custom-control custom-checkbox">
                        <input
                          onClick={(event) =>
                            this.selectedBrands(brand.id, event)
                          }
                          type="checkbox"
                          className="custom-control-input"
                          id={brand.id}
                        />
                        <label className="custom-control-label" for={brand.id}>
                          {brand.name}
                          <span className="text-gray-25 font-size-12 font-weight-normal">
                            {" "}
                            ({brand.product_count})
                          </span>
                        </label>
                      </div>
                    </div>
                  ))
                : null}

              {/* <a
                className="link link-collapse small font-size-13 text-gray-27 d-inline-flex mt-2"
                data-toggle="collapse"
                href="#collapseBrand"
                role="button"
                aria-expanded="false"
                aria-controls="collapseBrand"
              >
                <span className="link__icon text-gray-27 bg-white">
                  <span className="link__icon-inner">+</span>
                </span>
                <span className="link-collapse__default">Show more</span>
                <span className="link-collapse__active">Show less</span>
              </a> */}
            </div>

            {this.state.features
              ? this.state.features.map(feature => (
                  <div key={feature.id} className="border-bottom pb-4 mb-4">
                    <h4 className="font-size-14 mb-3 font-weight-bold">
                      {feature.name}
                    </h4>

                    {feature.values
                      ? feature.values.map(value => (
                          <div
                            key={value.id}
                            className="form-group d-flex align-items-center justify-content-between mb-2 pb-1"
                          >
                            <div className="custom-control custom-checkbox">
                              <input
                              onChange={selectedValues =>
                                this.setFeatureValuesSelected(selectedValues, index)
                              }
                                type="checkbox"
                                className="custom-control-input"
                                id={value.id}
                              />
                              <label
                                className="custom-control-label"
                                for={value.id}
                              >
                                {value.value}{" "}
                                <span className="text-gray-25 font-size-12 font-weight-normal">
                                  {" "}
                                  (56)
                                </span>
                              </label>
                            </div>
                          </div>
                        ))
                      : null}

                    {/* <a
                      className="link link-collapse small font-size-13 text-gray-27 d-inline-flex mt-2"
                      data-toggle="collapse"
                      href="#collapseColor"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseColor"
                    >
                      <span className="link__icon text-gray-27 bg-white">
                        <span className="link__icon-inner">+</span>
                      </span>
                      <span className="link-collapse__default">Show more</span>
                      <span className="link-collapse__active">Show less</span>
                    </a> */}
                  </div>
                ))
              : null}
         
          </div>
        </div>
      </>
    );
  }
}
