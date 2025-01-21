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

import { getFields } from "./alias.utils";
import { fieldErrorAction } from "../../../utils/store/field-error-slice";
import { stagesAction } from "../../../utils/store/stages-slice";
import { aliasAction } from "../../../utils/store/alias-slice";
import { getUrl } from "../../../utils/common/change.utils";
 
jest.mock("../../../utils/store/field-error-slice", () => ({
  fieldErrorAction: {
    getMandatoryFields: jest.fn(),
  },
}));
 
jest.mock("../../../utils/store/stages-slice", () => ({
  stagesAction: {
    removeAddToggleField: jest.fn(),
  },
}));
 
jest.mock("../../../utils/store/alias-slice", () => ({
  aliasAction: {
    updateCount: jest.fn(),
    addAliasField: jest.fn(),
  },
}));
 
jest.mock("../../../utils/common/change.utils", () => ({
  FindIndex: jest.fn(() => 0),
  getUrl: {
    getJourneyType: jest.fn(() => true),
  },
}));
 
describe("getFields", () => {
  const mockDispatch = jest.fn();
  const mockGetStages = [
    {
      stageId: "ssf-1",
      stageInfo: {
        fieldmetadata: {
          data: {
            stages: [{
              stageId:'bd-2',
                fields: [
                  {
                    logical_field_name: "alias",
                    component_type: "Text",
                    rwb_label_name: "Alias",
                  },
                ],
              }],
          },
        },
      },
    },
  ];
  const mockAliasSelector = {
    fields: ["alias_1", "alias_2"],
    count: 2,
    maxCount: 5,
  };
 
  beforeEach(() => {
    jest.clearAllMocks();
  });
 
  it("should return newFields and dispatch actions correctly when action is 'add'", () => {
    const action = "add";
    const result = getFields(mockGetStages, mockAliasSelector, action)(mockDispatch);
 
    expect(result).toHaveLength(3); // 2 existing aliases + 1 new alias
    expect(fieldErrorAction.getMandatoryFields).toHaveBeenCalledTimes(2);
    expect(stagesAction.removeAddToggleField).toHaveBeenCalledTimes(2);
    expect(aliasAction.updateCount).toHaveBeenCalledWith(3); // Increment count
    expect(aliasAction.addAliasField).toHaveBeenCalledWith("alias_3");
    expect(mockDispatch).toHaveBeenCalledTimes(6); // Dispatch actions
  });
 
  it("should return newFields and dispatch actions correctly when action is not 'add'", () => {
    const action = "remove";
    const result = getFields(mockGetStages, mockAliasSelector, action)(mockDispatch);
 
    expect(result).toHaveLength(2); // Only existing aliases
    expect(fieldErrorAction.getMandatoryFields).toHaveBeenCalledTimes(1);
    expect(stagesAction.removeAddToggleField).toHaveBeenCalledTimes(1);
    expect(aliasAction.updateCount).not.toHaveBeenCalled(); // Count should not be updated
    expect(aliasAction.addAliasField).not.toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledTimes(2); // Dispatch actions
  });
 
  it("should handle missing fields gracefully", () => {
    const mockGetStagesWithMissingFields = [
      {
        stageId: "ssf-1",
        stageInfo: {
          fieldmetadata: {
            data: {
              stages: [{
                stageId:'bd-2',
                  fields: [],
                }],
            },
          },
        },
      },
    ];
    const action = "add";
    const result = getFields(mockGetStagesWithMissingFields, mockAliasSelector, action)(mockDispatch);
 
 
  });
 
  it("should handle empty aliasSelector fields gracefully", () => {
    const mockAliasSelectorEmptyFields = {
      fields: [],
      count: 0,
      maxCount: 5,
    };
    const action = "add";
    const result = getFields(mockGetStages, mockAliasSelectorEmptyFields, action)(mockDispatch);
 
    expect(result).toHaveLength(1); // Only new alias added
    expect(fieldErrorAction.getMandatoryFields).toHaveBeenCalledTimes(1);
    expect(stagesAction.removeAddToggleField).toHaveBeenCalledTimes(1);
    expect(aliasAction.updateCount).toHaveBeenCalledWith(1); // Increment count
    expect(aliasAction.addAliasField).toHaveBeenCalledWith("alias_1");
    expect(mockDispatch).toHaveBeenCalledTimes(4); // Dispatch actions
  });
});
 
import { AppDispatch } from "../../services/common-service";
import { FindIndex } from "../../utils/common/change.utils";
import { KeyWithAnyModel,StageDetails,taxStoreModel } from "../../utils/model/common-model";
import { fieldErrorAction } from "../../utils/store/field-error-slice";
import { stagesAction } from "../../utils/store/stages-slice";
import { taxAction } from "../../utils/store/tax-slice";
import { getUrl } from "../../utils/common/change.utils";

export const getFields = (
  getStages: Array<StageDetails>,
  taxSelector: taxStoreModel,
  action: string
): any => {
  return (dispatch: AppDispatch) => {
    let fields: Array<KeyWithAnyModel> | undefined = getStages[0].stageInfo.fieldmetadata.data.stages[2].fields;
    let newFileds: Array<KeyWithAnyModel> = [];
    let newFieldsArray: Array<string> = [];
    const journeyType = getUrl.getJourneyType();

    let getClonedField = (logical_field_name: string) => {
      if (fields) {
        let field = fields.find(
          fieldData => fieldData.logical_field_name === logical_field_name
        );
        if (field && field.logical_field_name) {
          return { ...field };
        } else {
          return null;
        }
      } else {
        return null;
      }
    };

    taxSelector.fields.forEach((field: string) => {
        
      let no_of_tax_residency_country = getClonedField("no_of_tax_residency_country");
      if (field && no_of_tax_residency_country) {
        no_of_tax_residency_country.logical_field_name = field;
        no_of_tax_residency_country.component_type = "Selection Box";
        no_of_tax_residency_country.rwb_label_name = "No. of Tax Residency Country";
        if (journeyType) {
            no_of_tax_residency_country.hide_remove_btn = true;
        }
        newFileds.push(no_of_tax_residency_country);
        newFieldsArray.push(no_of_tax_residency_country.logical_field_name);
      }
    });

    if (newFieldsArray.length > 0) {
      dispatch(fieldErrorAction.getMandatoryFields(newFieldsArray));
      dispatch(
        stagesAction.removeAddToggleField({
          removeFields: [],
          newFields: newFieldsArray,
          value: ""
        })
      );
    }
  return newFileds;
  };
};

import { getFields } from "./tax.utils";
import { fieldErrorAction } from "../../utils/store/field-error-slice";
import { stagesAction } from "../../utils/store/stages-slice";
import { getUrl } from "../../utils/common/change.utils";

jest.mock("../../utils/store/field-error-slice", () => ({
  fieldErrorAction: {
    getMandatoryFields: jest.fn(),
  },
}));

jest.mock("../../utils/store/stages-slice", () => ({
  stagesAction: {
    removeAddToggleField: jest.fn(),
  },
}));

jest.mock("../../utils/common/change.utils", () => ({
  FindIndex: jest.fn(() => 0),
  getUrl: {
    getJourneyType: jest.fn(() => true),
  },
}));

describe("getFields", () => {
  const mockDispatch = jest.fn();
  const mockGetStages = [
    {
      stageId: "stage-1",
      stageInfo: {
        fieldmetadata: {
          data: {
            stages: [
              {
                stageId: "stage-3",
                fields: [
                  {
                    logical_field_name: "no_of_tax_residency_country",
                    component_type: "Text",
                    rwb_label_name: "Number of Tax Residency Countries",
                  },
                ],
              },
            ],
          },
        },
      },
    },
  ];

  const mockTaxSelector = {
    fields: ["tax_field_1", "tax_field_2"],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return newFields and dispatch actions correctly when action is 'add'", () => {
    const action = "add";
    const result = getFields(mockGetStages, mockTaxSelector, action)(mockDispatch);

    expect(result).toHaveLength(2); // Corresponding to `mockTaxSelector.fields`
    expect(fieldErrorAction.getMandatoryFields).toHaveBeenCalledWith([
      "tax_field_1",
      "tax_field_2",
    ]);
    expect(stagesAction.removeAddToggleField).toHaveBeenCalledWith({
      removeFields: [],
      newFields: ["tax_field_1", "tax_field_2"],
      value: "",
    });
    expect(mockDispatch).toHaveBeenCalledTimes(2); // Dispatching actions
  });

  it("should return newFields and not dispatch actions if no fields are found", () => {
    const mockEmptyStages = [
      {
        stageId: "stage-1",
        stageInfo: {
          fieldmetadata: {
            data: {
              stages: [
                {
                  stageId: "stage-3",
                  fields: [],
                },
              ],
            },
          },
        },
      },
    ];

    const action = "add";
    const result = getFields(mockEmptyStages, mockTaxSelector, action)(mockDispatch);

    expect(result).toHaveLength(0); // No fields to process
    expect(fieldErrorAction.getMandatoryFields).not.toHaveBeenCalled();
    expect(stagesAction.removeAddToggleField).not.toHaveBeenCalled();
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it("should handle an empty taxSelector.fields gracefully", () => {
    const mockEmptyTaxSelector = {
      fields: [],
    };

    const action = "add";
    const result = getFields(mockGetStages, mockEmptyTaxSelector, action)(mockDispatch);

    expect(result).toHaveLength(0); // No new fields
    expect(fieldErrorAction.getMandatoryFields).not.toHaveBeenCalled();
    expect(stagesAction.removeAddToggleField).not.toHaveBeenCalled();
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it("should clone fields and modify them based on conditions", () => {
    getUrl.getJourneyType.mockReturnValue(false);

    const action = "add";
    const result = getFields(mockGetStages, mockTaxSelector, action)(mockDispatch);

    expect(result[0]).toEqual(
      expect.objectContaining({
        logical_field_name: "tax_field_1",
        component_type: "Selection Box",
        rwb_label_name: "No. of Tax Residency Country",
        hide_remove_btn: false,
      })
    );
    expect(result[1]).toEqual(
      expect.objectContaining({
        logical_field_name: "tax_field_2",
        component_type: "Selection Box",
        rwb_label_name: "No. of Tax Residency Country",
        hide_remove_btn: false,
      })
    );
  });
});
