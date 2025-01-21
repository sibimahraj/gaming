import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import Alias from './alias';
import { getFields } from './alias.utils';
import { constant } from './constant';
import React from 'react';

jest.autoMockOff();
jest.mock("axios", () => ({
  __esModule: true,
}));
jest.mock("@lottiefiles/react-lottie-player", () => ({
  __esModule: true,
}));

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('./alias.utils', () => ({
  getFields: jest.fn(),
}));


describe('Alias Component', () => {
  const mockDispatch = jest.fn(()=>{
    return [
      {
        stageId: "ssf-1",
        stageInfo: {
          fieldmetadata: {
            data: {
              stages: {
                "bd-2": {
                  fields: [
                    {
                      logical_field_name: "alias",
                      component_type: "Text",
                      rwb_label_name: "Alias",
                    },
                  ],
                },
              },
            },
          },
        },
      },
    ]
  });
  const mockGetFields = jest.fn();
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(()=>{});
    jest.clearAllMocks();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    jest.spyOn(React,'useState')
      .mockImplementationOnce(()=>[[{
        "logical_field_name": "alias_1",
        "lov_field_name": "Alias",
        "rwb_label_name": "Alias (s) 1",
        "field_set": "Yes",
        "field_set_name": "Personal Details",
        "component_type": "Text",
        "mandatory": "Conditional",
        "length": "105",
        "type": "Text",
        "regex": "^[a-zA-Z-@&().,'/]+(?: [a-zA-Z-@&().,'/]+)*$",
        "hide_remove_btn": true
    }],jest.fn()]);

      
    (getFields as jest.Mock).mockImplementation(mockGetFields);
  });

  it('should call getFields on initial render with "get" action', () => {
    (useSelector as jest.Mock).mockImplementation((selectorFn)=>{
      if (selectorFn.toString().includes('state.stages.stages')){
          return [{
            "stageId": "bd-2",
            "stageInfo": {
              "application": {
                "source_system_name": 3
              }
            }
          }];
      }
      if (selectorFn.toString().includes('state.alias')){
        return {
          count: 1,
          fields: ['alias_1'],
          maxCount: 4
        };
    }
    if (selectorFn.toString().includes('state.stages.journeyType')){
      return true
  }
      return null;
    });
    render(<Alias handleCallback={jest.fn()} handleFieldDispatch={jest.fn()} value={{
      "marital_status": null,
      "education_level": "",
      "country": "",
      "ownership_status": "",
      "gender": "",
      "country_of_birth": ""
  }} />);
    expect(mockDispatch).toHaveBeenCalled();
    const button = screen.getByPlaceholderText(constant.placeholder);
    expect(button).toHaveClass('show-btn, button');
    fireEvent.click(button);
    expect(mockGetFields).toHaveBeenCalled();
  });

  it('hide button should render', () => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    jest.spyOn(React,'useState')
      .mockImplementationOnce(()=>[[],jest.fn()]);

    (useSelector as jest.Mock).mockImplementation((selectorFn)=>{
      if (selectorFn.toString().includes('state.stages.stages')){
          return [{
            "stageId": "bd-2",
            "stageInfo": {
              "application": {
                "source_system_name": 3
              }
            }
          }];
      }
      if (selectorFn.toString().includes('state.alias')){
        return {
        };
    }
    if (selectorFn.toString().includes('state.stages.journeyType')){
      return true
  }
      return null;
    });
    render(<Alias handleCallback={jest.fn()} handleFieldDispatch={jest.fn()} value={{
      "marital_status": null,
      "education_level": "",
      "country": "",
      "ownership_status": "",
      "gender": "",
      "country_of_birth": ""
  }} />);
    expect(mockDispatch).toHaveBeenCalled();
    const button = screen.getByPlaceholderText(constant.placeholder);
    expect(button).toHaveClass('hide-btn');
    fireEvent.click(button);
    expect(mockGetFields).toHaveBeenCalled();
  });
});

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { KeyWithAnyModel ,StoreModel} from "../../utils/model/common-model";
//import "./alias.scss";
import { getFields } from "./tax.utils";
import renderComponent from "../../modules/dashboard/fields/renderer";
import { constant } from "../components/alias/constant";

export const Tax = (props: KeyWithAnyModel) => {
 const stageSelector = useSelector(
    (state: StoreModel) => state.stages.stages
  );

  const journeyType = useSelector((state: StoreModel) => state.stages.journeyType);

  const taxSelector = useSelector(
    (state: StoreModel) => state.tax
  );

  const dispatch = useDispatch();
  const [field, setField] = useState([]);
  const addNewAliasName = () => {
    const stageComponents = dispatch(
        getFields(stageSelector, taxSelector, "add")
    );
    setField(stageComponents);
  };

  useEffect(() => {
        /* istanbul ignore else */
    if (stageSelector) {
      const stageComponents = dispatch(
        getFields(stageSelector, taxSelector, "get")
      );
      setField(stageComponents);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taxSelector]);

    return (
        <>
         {field &&
          field.map((currentSection: KeyWithAnyModel, index: number) => {
            return renderComponent(
              currentSection,
              index,
              props.handleCallback,
              props.handleFieldDispatch,
              props.value
            );
          })}
         
         </>
        )
}

export default Tax;

import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import Tax from './tax';
import { getFields } from './tax.utils';
import React from 'react';

jest.autoMockOff();
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('./tax.utils', () => ({
  getFields: jest.fn(),
}));

describe('Tax Component', () => {
  const mockDispatch = jest.fn(() => [
    {
      fieldId: 'tax-1',
      fieldData: {
        logical_field_name: 'taxDetails',
        component_type: 'Dropdown',
        rwb_label_name: 'Tax Details',
      },
    },
  ]);
  const mockGetFields = jest.fn();

  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.clearAllMocks();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [
      [
        {
          logical_field_name: 'tax_1',
          lov_field_name: 'Tax Details',
          rwb_label_name: 'Tax Info',
          field_set: 'Yes',
          field_set_name: 'Financial Details',
          component_type: 'Dropdown',
          mandatory: 'Yes',
        },
      ],
      jest.fn(),
    ]);
    (getFields as jest.Mock).mockImplementation(mockGetFields);
  });

  it('should call getFields on initial render with "get" action', () => {
    (useSelector as jest.Mock).mockImplementation((selectorFn) => {
      if (selectorFn.toString().includes('state.stages.stages')) {
        return [
          {
            stageId: 'tx-1',
            stageInfo: {
              fieldmetadata: {
                data: {
                  stages: {
                    'tx-1': {
                      fields: [
                        {
                          logical_field_name: 'taxDetails',
                          component_type: 'Dropdown',
                          rwb_label_name: 'Tax Details',
                        },
                      ],
                    },
                  },
                },
              },
            },
          },
        ];
      }
      if (selectorFn.toString().includes('state.tax')) {
        return { count: 1, fields: ['tax_1'], maxCount: 3 };
      }
      if (selectorFn.toString().includes('state.stages.journeyType')) {
        return 'business';
      }
      return null;
    });

    render(
      <Tax
        handleCallback={jest.fn()}
        handleFieldDispatch={jest.fn()}
        value={{
          taxCategory: '',
          annualIncome: '',
        }}
      />
    );

    expect(mockDispatch).toHaveBeenCalled();
    expect(mockGetFields).toHaveBeenCalled();
  });

  it('should render fields based on state and allow user interaction', () => {
    (useSelector as jest.Mock).mockImplementation((selectorFn) => {
      if (selectorFn.toString().includes('state.stages.stages')) {
        return [
          {
            stageId: 'tx-1',
            stageInfo: {
              fieldmetadata: {
                data: {
                  stages: {
                    'tx-1': {
                      fields: [
                        {
                          logical_field_name: 'taxDetails',
                          component_type: 'Dropdown',
                          rwb_label_name: 'Tax Details',
                        },
                      ],
                    },
                  },
                },
              },
            },
          },
        ];
      }
      if (selectorFn.toString().includes('state.tax')) {
        return { count: 1, fields: ['tax_1'], maxCount: 3 };
      }
      return null;
    });

    render(
      <Tax
        handleCallback={jest.fn()}
        handleFieldDispatch={jest.fn()}
        value={{
          taxCategory: '',
          annualIncome: '',
        }}
      />
    );

    const dropdown = screen.getByText('Tax Details');
    expect(dropdown).toBeInTheDocument();
    fireEvent.click(dropdown);
    expect(mockGetFields).toHaveBeenCalled();
  });
});
