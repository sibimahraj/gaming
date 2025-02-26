 useEffect(() => {
    taxSelector.fields.forEach(field => {
        const fieldIndex = field.split("_").pop(); 
        const fieldValue = userInputSelector.applicants[`${field}_a_1`];
        if (fieldValue && fieldValue.length >= 9) {
          const reasonField = `crs_reason_code_${fieldIndex}`;
          if (taxSelector.fields.includes(reasonField)) {
            dispatch(taxAction.removeTaxField(reasonField));
            dispatch(
              stagesAction.removeAddToggleField({
                removeFields: [reasonField],
                newFields: [],
              })
            );
          }
        }else if(fieldValue && fieldValue.length === 3){
          const reasonField = `crs_reason_code_${fieldIndex}_a_1`;
          if (userInputSelector.applicants[reasonField]==="B00") {
            debugger
            const crsCommentsField=`crs_comments_${fieldIndex}`;
            dispatch(taxAction.updateTax({[crsCommentsField]:''}));
            dispatch(
              stagesAction.removeAddToggleField({
                removeFields: [],
                newFields: [`crs_comments_${fieldIndex}`],
                value:''
              })
            );
          }
          else{
            const taxValue= `tax_id_no_${fieldIndex}_a_1`
            if(userInputSelector.applicants[taxValue]){
            dispatch(
              stagesAction.removeAddToggleField({
                removeFields: [`crs_reason_code_${fieldIndex}`],
                newFields: [],
              })
            );
            }else{
              dispatch(
                stagesAction.removeAddToggleField({
                  removeFields: [`tax_id_no_${fieldIndex}`],
                  newFields: [],
                })
              );
            }
          }
        }
    });
  }, [taxSelector.fields, userInputSelector.applicants]);
