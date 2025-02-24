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



import "./model.scss";
import { FieldModel, KeyWithAnyModel, StoreModel } from "../../../utils/model/common-model";
import modelInfo from "../../../assets/_json/model.json";
import trackEvents from "../../../services/track-events";
import { useSelector, useDispatch } from "react-redux";
import { getUrl, FindIndex, getTokenChno } from "../../../utils/common/change.utils";
import { redirectingToIbanking, rateRequest, formConfig, submitBasicDataMyInfo, channelReference } from "../../../services/common-service";
import { Player } from "@lottiefiles/react-lottie-player";
import lottieSrc from "../../../assets/_json/lottie/oops.json";
import validateService from "../../../services/validation-service";
import { useState, useEffect } from "react";
import { referralcodeAction } from "../../../utils/store/referral-code-slice";
import errorMsg from "../../../assets/_json/error.json";
import { stagesAction } from "../../../utils/store/stages-slice";
import { stageFields } from "../../../modules/dashboard/fields/fields.utils";
import { stateUrl } from "../../../modules/dashboard/fields/stage.utils";

const Model = (props: KeyWithAnyModel) => {
  const modelsData: KeyWithAnyModel = modelInfo;
  let modelData = modelsData.find((model: any) => model.name === props.name);
  
  const stageSelector = useSelector((state: StoreModel) => state.stages.stages);
  const [showReferralPopupContent, setShowReferralPopupContent] =
    useState(false);
  const referralcodeSelector = useSelector((state: any) => state.referralcode);
  const resumeSelector = useSelector(
    (state: StoreModel) => state.urlParam.resume
  );
  
  //Start code for postal popup
  const rateSelector = useSelector((state: StoreModel) => state.rate);
  const [ar, setAr] = useState("");
  const [eir, setEir] = useState("");
  const [pincode, setPincode] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const [postalMinLen, setPostalMinLen] = useState(6);
  const [basicResponse,setBasicResponse]=useState();
  const [fields, setFields] = useState<FieldModel | null>();
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (props.name === "postal_code" && rateSelector.ar) {
      setAr(rateSelector.ar);
      setEir(rateSelector.eir);
     // modelData.header_content = modelData.header_content_second;
     // modelData.body_content = [""];
     // modelData.buttons = modelData.buttons_second;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rateSelector]);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length >= postalMinLen) {
      setPincode(event.target.value);
    } else {
      setPincode("");
    }
  };

  useEffect(() => {
    if (props.name === "postal_code") {
      const stageIndex = FindIndex(stageSelector[0].stageInfo, 'bd');
      if (stageIndex) {
        const postalProp = (stageSelector[0].stageInfo.fieldmetaData.data.stages[stageIndex].fields.filter((field: KeyWithAnyModel) => field.logical_field_name === 'postal_code'));
        if (postalProp) {
          setPostalMinLen(postalProp[0].min_length);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  const allowOnlyNumber = (event: any, fieldName: string) => {
    if (pincode && pincode.length > postalMinLen) {
      return false;
    }
    validateService.allowOnlyCharacter(event, fieldName);
  };

 //End code for postal popup

 
  let header_content = modelData.header_content
  
    ? modelData.header_content
    : props.name;
  if (header_content === "ageHardStop") {
    header_content = "Age Hard Stop";
  } 
  else if (header_content === "usHardStop") {
    header_content = "We are unable to open accounts for US residents";
  }
  trackEvents.triggerAdobeEvent("popupViewed", header_content);

  const handlebuttonClick = (index: number) => {
    if (props.name === "postal_code") {
      setButtonClicked(true);
      trackEvents.triggerAdobeEvent(
        "ctaClick",
        `${modelData.buttons[index],modelData.PostalCodebuttons[index]}:${header_content}`,
        {},
        modelData.header_content
      );
      if (rateSelector.ar) {
        props.handlebuttonClick();
      } else {
        if (pincode && pincode.length >= postalMinLen) {
         dispatch(formConfig('manual',stageSelector[0].stageInfo))
          dispatch(stagesAction.updateLastStageInput); 
          let stateInfofield = stageSelector[0].stageInfo;
          const productCategory = stageSelector[0].stageInfo.products.map((product:any)=>product.product_category);
          const productCategories=productCategory.join(",");
          let fieldUpdate:any;
          fieldUpdate = {...stateInfofield,
            applicants:{
              ...stateInfofield.applicants,
              first_name_a_1:stateInfofield.applicants.full_name_a_1,
              address_usage_indicator_a_1: "MIF",
              product_categories:productCategories
            }
            }
            let channelReferenceNumber = getTokenChno().channelRefNo;
          channelReference(fieldUpdate,channelReferenceNumber,dispatch).then((response:any)=>{
            setBasicResponse(response.data);
            if(stageSelector[0].stageInfo.products[1].product_category === 'PL'){
              //  dispatch(rateRequest("34567",stageSelector[0].stageInfo))
               dispatch(stagesAction.updateLastStageInput(stageSelector[0].stageId));
               setFields(
                 stageFields(
                   stageSelector,
                   "ld-1",
                )
               );
               stateUrl("ld-1");
               dispatch(stagesAction.resetCurrentStage("ld-1"));
               dispatch(stagesAction.updateStageId("ld-1"));
             }
          } )

      }
    }}
    else if (props.name === "nationalityHardStop" || props.name === "showTrustInfo" || props.name === "showLoanInfo" || props.name === "showEIRInfo" || props.name === "preferred_limit" || props.name === "preferred_credit_limit" || props.name === "contact_preference" || props.name === "enter_account_info") {
      props.handlebuttonClick();
      trackEvents.triggerAdobeEvent(
        "ctaClick",
        `${modelData.buttons[index]}:${header_content}`,
        {},
        header_content 
      );
    } else {
      trackEvents.triggerAdobeEvent(
        "ctaClick",
        `${modelData.buttons[index]}:${header_content}`,
        {},
        header_content
      );
      if (props.name === "CCThankYou") {
        if (index === 0) {
          if (props.handleContinueWithoutActivation) {
            props.handleContinueWithoutActivation();
          } else {
            props.handlebuttonClick();
          }
        } else {
          props.handlebuttonClick();
        }
      } else if (props.name === "CCCardActivation") {
        if (props.handleOTPSuccessClick) {
          props.handleOTPSuccessClick();
        } else {
          props.handlebuttonClick();  
         }
                 
      } else if (index === 0 && !props.callBackMethod && (referralcodeSelector  && referralcodeSelector.refer && referralcodeSelector.refer !== "true")) {
        if (
          (getUrl.getParameterByName("SSCode") || getUrl.getParameterByName("transfer-token")) || getUrl.getUpdatedStage().ccplChannel =="IBK" || getUrl.getUpdatedStage().ccplChannel =="MBNK" ||
          (stageSelector && stageSelector.length > 0  &&
            (stageSelector[0].stageInfo.applicants["auth_mode_a_1"] === "IX" || stageSelector[0].stageInfo.applicants["auth_mode_a_1"] === "IM")
        )) {
          if (getUrl.getParameterByName("source") === "scm") {
            //Ibanking redirection for app
            window.location.href = `${process.env.REACT_APP_IBANKING_SC_MOBILE}`;
          } else {
            redirectingToIbanking();
          }
        } else {
          window.location.href = `${process.env.REACT_APP_HOME_PAGE_URL}`;
        }
      }else if (
        props.name === "referral_code" &&
        (referralcodeSelector.refer !== null ||
          (referralcodeSelector.refer === null && resumeSelector))
      ) {
        if (index === 0) {
          props.setContinueWithoutReferralcode(false);
          props.setShowReferralcodePopup(false);
          dispatch(
            referralcodeAction.setReferralErrorMsg(
                errorMsg.referralcodeerror 
            )
          );
        } else {
          props.setContinueWithoutReferralcode(true);
          props.setShowReferralcodePopup(false);
          dispatch(
            referralcodeAction.setReferralErrorMsg("")
          );
        }
      } else if(props.name==="country_of_tax_residence"){
        props.handlebuttonClick()
      }
      else if(props.name==="crs_reason_code"){
        props.handlebuttonClick()
      }
      else if (props.handlebuttonClick) {
        if(index===0&&props.name!=="other_name_or_alias"){
        window.location.href = `${process.env.REACT_APP_HOME_PAGE_URL}`};
        props.handlebuttonClick();
      }
    }
  };
  useEffect(() => {
    if (
      props.name === "referral_code" &&
      (referralcodeSelector.refer !== null ||
        (referralcodeSelector.refer === null && resumeSelector))
    ) {
      setShowReferralPopupContent(true);
    }
 // eslint-disable-next-line react-hooks/exhaustive-deps    
  }, [referralcodeSelector.refer,showReferralPopupContent]);

  const handleRatebuttonClick = (index: number) =>{
    if (props.name === "postal_code") {
      setButtonClicked(true);
      trackEvents.triggerAdobeEvent(
        "ctaClick",
        `${modelData.buttons[index],modelData.PostalCodebuttons[index]}:${header_content}`,
        {},
        modelData.header_content
      );
      if (pincode && pincode.length >= postalMinLen) {
        dispatch(rateRequest(pincode,stageSelector[0].stageInfo));  
      }
    }
  };

  return (
    <>
      {modelData && props.name !== "ageHardStop" && (
       <div className={`popup ${props.name === "postal_code" ? "postal__code__popup": ""}`}>
          <div className="popup__container" id={modelData.buttons[1]}>
            {props.name !== "postal_code" && (
              <div className={`${
                showReferralPopupContent
                  ? "referralcode-popup-icon"
                  : "waring__icon"
              }`}>
                {!props.isTooltip && !showReferralPopupContent && (
                  <Player src={lottieSrc} className="player" loop autoplay />
                )}
                {props.isTooltip && !showReferralPopupContent && <div className="popup__question"></div>}
              </div>
            )}
            <div className="popup__info">
              {modelData.header_content && (
                <div
                  className={`popup__info__head ${
                    props.name === "postal_code"
                      ? "popup__info__head__underline"
                      : ""
                  }`}
                >
                  {modelData.header_content}
                </div>
              )}
              <div className="popup__info__desc">
                <div className="model__content">
                  {props.name !== "ageHardStop" &&
                    modelData.body_content.map(
                      (content: string, index: number) => {
                        return (
                          <p key={`${content}${index}`}>
                            {content}
                            {(props.name === "preferred_limit" ||
                              (props.name === "preferred_credit_limit" &&
                                index === 1)) && (
                              <a
                                rel="noreferrer"
                                href={
                                  process.env.REACT_APP_PREFERRED_LIMIT_FAQS
                                }
                                target="_blank"
                              >
                                FAQs
                              </a>
                            )}
                          </p>
                        );
                      }
                    )}
                  {/* {props.name === "ageHardStop" &&
                    modelData.body_content.map(
                      (content: string, index: number) => {
                        return (
                          <p
                            key={`${content}${index}`}
                          >{`${content} ${props.body_content}`}</p>
                        );
                      }
                    )} */}
                  {props.name === "postal_code" && (
                    <>
                    <div className='postal_code_lable'>{modelData.postal_code_lable}</div>
                    <div className="postalCode" >
                      {(
                        <input
                          className="postalCodeText"
                          type="text"
                          placeholder="Enter postal code"
                          name="postCode"
                          onChange={changeHandler.bind(this)}
                          onKeyPress={event =>
                            allowOnlyNumber(event, "postal_code")
                          }
                          maxLength={6}
                        />
                        
                      )}
                    {modelData.buttons &&
                    modelData.buttons.map((button: string, index: number) => {
                    return (
                      <div className="postalCodeTextButton">
                        <p
                          className="btnRate"
                          onClick={() => handleRatebuttonClick(index)}
                          key={`${button}${index}`}>
                          {button}
                        </p>
                      </div>
                    );
                   })}
                  </div>
                      {buttonClicked && !pincode && (
                        <div className="postal__error">
                          {modelData.errorDesc}
                        </div>
                      )}
                      {ar && (
                        <>
                        <div className="postal_image_main"> 
                          <div className="postal_image"></div>
                        </div>
                         <div className='header_second'>{modelData.header_content_second}</div>
                            <div className="ar__rate">
                              <div>{ar}% p.a.</div>
                              <div>(EIR {eir}% p.a.)</div>
                            </div>
                            <p> {modelData.popupDescription} </p>
                        </>
                      )}
                    </>
                  )}
                </div>
                {props.name === "postal_code" && ar && modelData.PostalCodebuttons &&
                  modelData.PostalCodebuttons.map((button: string, index: number) => {
                    return (
                      <div className="postalcode_conti_btn">
                        <p
                          className="btn"
                          onClick={() => handlebuttonClick(index)}
                          key={`${button}${index}`}
                        >
                          {button}
                        </p>
                      </div>
                    );
                  })}
                {props.name !== "postal_code" && modelData.buttons &&
                  modelData.buttons.map((button: string, index: number) => {
                    return (
                      <div className="postal__code__btn">
                        <p
                          className="btn" 
                          onClick={() => handlebuttonClick(index)}
                          key={`${button}${index}`}
                        >
                          {button}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
    
  );
};

export default Model;
