package ar.edu.itba.paw.models;

import ar.edu.itba.paw.models.Constants.QueryFilterName;
import ar.edu.itba.paw.models.Constants.QueryOperator;

public class Filter {
	private Integer intValue;
	private String stringValue;
	private QueryFilterName nameValue;
	private QueryOperator operator;
	
	public Filter(Integer intValue, QueryFilterName nameValue, QueryOperator operator) {
		this.setIntValue(intValue);
		this.setOperator(operator);
		this.setNameValue(nameValue);
	}
	
	public Filter(String stringValue, QueryFilterName nameValue, QueryOperator operator) {
		this.setStringValue(stringValue);
		this.setOperator(operator);
		this.setNameValue(nameValue);
	}

	public Integer getIntValue() {
		return intValue;
	}

	public void setIntValue(Integer intValue) {
		this.intValue = intValue;
	}

	public String getStringValue() {
		return stringValue;
	}

	public void setStringValue(String stringValue) {
		this.stringValue = stringValue;
	}

	public QueryOperator getOperator() {
		return operator;
	}

	public void setOperator(QueryOperator operator) {
		this.operator = operator;
	}

	public QueryFilterName getNameValue() {
		return nameValue;
	}

	public void setNameValue(QueryFilterName nameValue) {
		this.nameValue = nameValue;
	}
}
