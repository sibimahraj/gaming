import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider, useSelector } from "react-redux";
import configureStore from "redux-mock-store";
import SelectionBox from "./selection-box";
import { ValueUpdateAction } from "../../../utils/store/value-update-slice";


jest.mock("axios", () => ({
    __esModule: true,
  }));
  jest.mock("@lottiefiles/react-lottie-player", () => ({
    __esModule: true,
  }));
  

const mockStore = configureStore([]);

describe("SelectionBox Component", () => {
  let store:any;

  const mockProps = {
    data: {
      component_type: "Selection Box",
      logical_field_name: "test_field",
      rwb_label_name: "Test Field",
      editable: false,
    },
    handleCallback: jest.fn(),
    handleFieldDispatch: jest.fn(),
    flowType: false,
  };

  beforeEach(() => {
    jest.spyOn(console,"error").mockImplementation(()=>{});
    jest.clearAllMocks();

    store = mockStore({
      lov: { lov: [{label:"country_of_tax_residence",value:"SG"}] },
      fielderror: { error: {} },
      stages: {
        stages: [{ stageInfo: { applicants: {}, products: [{
            product_type:'880'
        }] }, stageId: "test" }],
        userInput: { applicants: [{credit_into_a_1:'Other Bank Account',other_bank_name_a_1 :''}] },
        myinfoResponse: {},
        dependencyFields: null,
        journeyType: "ETC",
      },
      loanTopUp: { selectedLoan: null, selectedAccount: null },
    });

    store.dispatch = jest.fn();

  });

  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <SelectionBox {...mockProps} />
      </Provider>
    );
    expect(screen.getByPlaceholderText(/Test Field/i)).toBeInTheDocument();
  });

  it("onClick dropdownHandler", () => {
    render(
      <Provider store={store}>
        <SelectionBox {...mockProps} />
      </Provider>
    );
    const dropdown = screen.getByPlaceholderText(/Test Field/i);
    fireEvent.click(dropdown);
  });

  it("onClick removeTaxField", () => {
    const Props = {
        data: {
          component_type: "Selection Box",
          logical_field_name: "test_remove_tax_info_field",
          rwb_label_name: "Test Field",
          editable: false,
        },
        handleCallback: jest.fn(),
        handleFieldDispatch: jest.fn(),
        flowType: false,
      };
    render(
      <Provider store={store}>
        <SelectionBox {...Props}/>
      </Provider>
    );
    const deleteButton = screen.getByText(/Delete/i);
    expect(deleteButton).toBeInTheDocument();
    fireEvent.click(deleteButton);
  });
 
   it("handles dropdown click and close behavior", () => {
        render(
          <Provider store={store}>
            <SelectionBox {...mockProps} />
          </Provider>
        );
    
        const dropdown = screen.getByPlaceholderText("Test Field");
        fireEvent.click(dropdown);
        expect(screen.getByPlaceholderText("Search")).toHaveFocus();
    
        const closeButton:any = document.querySelector('.close');
        expect(closeButton).toBeInTheDocument();
        fireEvent.click(closeButton);
      });
     

      it("renders when product code is ['153', '338', '514', '507'] and logical_field_name is purpose_of_account", () => {
        store = mockStore({
            lov: { lov: [] },
            fielderror: { error: {} },
            stages: {
              stages: [{ stageInfo: { applicants: {}, products: [{
                  product_type:'153'
              }] }, stageId: "test" }],
              userInput: { applicants: {} },
              myinfoResponse: {},
              dependencyFields: null,
              journeyType: "ETC",
            },
            loanTopUp: { selectedLoan: null, selectedAccount: null },
          });
      
          store.dispatch = jest.fn();
        const Props = {
            data: {
              component_type: "Selection Box",
              logical_field_name: "purpose_of_account",
              rwb_label_name: "Purpose of Account",
              editable: false,
            },
            handleCallback: jest.fn(),
            handleFieldDispatch: jest.fn(),
            flowType: false,
          };
        
        render(
          <Provider store={store}>
            <SelectionBox {...Props} />
          </Provider>
        );
        expect(screen.getByPlaceholderText("Select the purpose of the account")).toBeInTheDocument();
      });

      it("renders when logical_field_name is crs_reason_code", () => {
        const mockProps = {
            data: {
              component_type: "Selection Box",
              logical_field_name: "crs_reason_code",
              rwb_label_name: "CRS Reason Code",
              editable: false,
            },
            handleCallback: jest.fn(),
            handleFieldDispatch: jest.fn(),
            flowType: false,
          };
        render(
          <Provider store={store}>
            <SelectionBox {...mockProps} />
          </Provider>
        );
            
        expect(screen.getByPlaceholderText("CRS Reason Code")).toBeInTheDocument();
      });
      it("renders when country_of_tax_residence_a_1 is SG", () => {
        store = mockStore({
            lov: { lov: [] },
            fielderror: { error: {} },
            stages: {
              stages: [{ stageInfo: { applicants: {}, products: [{
                  product_type:'280'
              }] }, stageId: "test" }],
              userInput: { applicants: {country_of_tax_residence_a_1: 'SG'} },
              myinfoResponse: {},
              dependencyFields: null,
              journeyType: "ETC",
            },
          });
      
          store.dispatch = jest.fn();
        const Props = {
            data: {
                component_type: "Selection Box",
                logical_field_name: "crs_reason_code",
                rwb_label_name: "CRS Reason Code",
                editable: false,
              },
            handleCallback: jest.fn(),
            handleFieldDispatch: jest.fn(),
            flowType: false,
          };
        
        render(
          <Provider store={store}>
            <SelectionBox {...Props} />
          </Provider>
        );
        expect(screen.getByText("CRS Reason Code")).toBeInTheDocument();
      });
      it("hide crs_reason_code when tax_id_no is not empty", () => {
        store = mockStore({
            lov: { lov: [] },
            fielderror: { error: {} },
            stages: {
              stages: [{ stageInfo: { applicants: {}, products: [{
                  product_type:'280'
              }] }, stageId: "test" }],
              userInput: { applicants: {tax_id_no_a_1:'1234'} },
              myinfoResponse: {},
              dependencyFields: null,
              journeyType: "ETC",
            },
          });
      
          store.dispatch = jest.fn();
        const Props = {
            data: {
                component_type: "Selection Box",
                logical_field_name: "crs_reason_code",
                rwb_label_name: "CRS Reason Code",
                editable: false,
              },
            handleCallback: jest.fn(),
            handleFieldDispatch: jest.fn(),
            flowType: false,
          };
        
        render(
          <Provider store={store}>
            <SelectionBox {...Props} />
          </Provider>
        );
        expect(store.dispatch).toHaveBeenCalled();
      });
      it("renders when country_of_tax_residence_a_1 othar than SG", () => {
        store = mockStore({
            lov: { lov: [] },
            fielderror: { error: {} },
            stages: {
              stages: [{ stageInfo: { applicants: {}, products: [{
                  product_type:'280'
              }] }, stageId: "test" }],
              userInput: { applicants: {country_of_tax_residence_a_1: 'IN',crs_reason_code_a_1:''} },
              myinfoResponse: {},
              dependencyFields: null,
              journeyType: "ETC",
            },
          });
      
          store.dispatch = jest.fn();
        const Props = {
            data: {
                component_type: "Text",
                logical_field_name: "tax_id_no",
                rwb_label_name: "Tax Id No",
                editable: false,
              },
            handleCallback: jest.fn(),
            handleFieldDispatch: jest.fn(),
            flowType: false,
          };
        
        render(
          <Provider store={store}>
            <SelectionBox {...Props} />
          </Provider>
        );
        expect(store.dispatch).toHaveBeenCalled();
      });

    it('handles addUserInput & removeSelectedValues click',()=>{
        jest.spyOn(React,'useState')
        .mockImplementationOnce(()=>[false,jest.fn()])
        .mockImplementationOnce(()=>[[],jest.fn()])
        .mockImplementationOnce(()=>[[{CODE_VALUE:'1',CODE_DESC:'Test'}],jest.fn()])
        .mockImplementationOnce(()=>[true,jest.fn()])
        .mockImplementationOnce(()=>[false,jest.fn()])
        .mockImplementationOnce(()=>[[{CODE_VALUE:'1',CODE_DESC:'Test'}],jest.fn()])
        .mockImplementationOnce(()=>["Test",jest.fn()]);

        render(
            <Provider store={store}>
              <SelectionBox {...mockProps} />
            </Provider>
          );
        const multiClose:any = document.querySelector('.multi-close');
        expect(multiClose).toBeInTheDocument();
        fireEvent.click(multiClose);
        const radioButton:any = screen.getByRole('radio');
        expect(radioButton).toBeInTheDocument();
        fireEvent.click(radioButton);
         expect(store.dispatch).toHaveBeenCalledWith(ValueUpdateAction.getChangeUpdate({
            id: "test",
            changes: false,
          }));
    });

   
});


import { render, screen, fireEvent } from "@testing-library/react"; import { Provider } from "react-redux"; import configureStore from "redux-mock-store"; import Model from "./Model"; import trackEvents from "../../../services/track-events";

jest.mock("../../../services/track-events", () => ({ triggerAdobeEvent: jest.fn() }));

const mockStore = configureStore([]);

describe("Model Component", () => { let store; let mockProps;

beforeEach(() => { store = mockStore({ stages: { stages: [{ stageInfo: { fieldmetaData: { data: { stages: [] } }, applicants: {} }] } }, referralcode: {}, urlParam: { resume: null }, rate: { ar: "5.5", eir: "6.0" } });

mockProps = {
  name: "postal_code",
  handlebuttonClick: jest.fn(),
  handleContinueWithoutActivation: jest.fn(),
  handleOTPSuccessClick: jest.fn(),
  callBackMethod: jest.fn(),
  setContinueWithoutReferralcode: jest.fn(),
  setShowReferralcodePopup: jest.fn(),
  isTooltip: false,
  body_content: ""
};

});

const renderComponent = (props = mockProps) => { return render( <Provider store={store}> <Model {...props} /> </Provider> ); };

test("should render the component with postal_code and trigger Adobe Event", () => { renderComponent(); expect(trackEvents.triggerAdobeEvent).toHaveBeenCalledWith("popupViewed", "postal_code"); });

test("should update postal code input field", () => { renderComponent(); const input = screen.getByPlaceholderText("Enter postal code"); fireEvent.change(input, { target: { value: "123456" } }); expect(input.value).toBe("123456"); });

test("should not set pincode when input length is less than min length", () => { renderComponent(); const input = screen.getByPlaceholderText("Enter postal code"); fireEvent.change(input, { target: { value: "123" } }); expect(input.value).toBe("123"); });

test("should trigger handlebuttonClick for postal_code on valid input", () => { renderComponent(); const button = screen.getByText("Submit"); fireEvent.click(button); expect(mockProps.handlebuttonClick).toHaveBeenCalled(); });

test("should handle crs_reason_code scenario correctly", () => { mockProps.name = "crs_reason_code"; renderComponent(); const button = screen.getByText("Submit"); fireEvent.click(button); expect(mockProps.handlebuttonClick).toHaveBeenCalled(); });

test("should handle referral_code logic", () => { mockProps.name = "referral_code"; renderComponent(); const button = screen.getByText("Submit"); fireEvent.click(button); expect(mockProps.setContinueWithoutReferralcode).toHaveBeenCalled(); });

test("should redirect when name is nationalityHardStop", () => { mockProps.name = "nationalityHardStop"; renderComponent(); const button = screen.getByText("Submit"); fireEvent.click(button); expect(mockProps.handlebuttonClick).toHaveBeenCalled(); }); });




