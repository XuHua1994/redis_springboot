package com.fastech.base;

import java.io.Serializable;

public class Return implements Serializable {

	private static final long serialVersionUID = -5158708077742187883L;
	/* 状态码 */
	private Boolean state;
	/* 数据 */
	private Object result;
	/* 数据量 */
	private Integer total;
	private Integer pagenumber;
	private String msg;
	private String code;

	public Return() {
	}

	public Return(String code) {
		super();
		this.code = code;
	}

	public Return(Boolean state, String msg) {
		super();
		this.state = state;
		this.msg = msg;
	}

	public Return(Object result, Integer total, Integer pagenumber) {
		super();
		this.result = result;
		this.total = total;
		this.pagenumber = pagenumber;
	}

	public Return(Boolean state, Object result) {
		super();
		this.state = state;
		this.result = result;
	}

	public Return(Boolean state, Object result, String msg) {
		super();
		this.state = state;
		this.result = result;
		this.msg = msg;
	}

	public Return(Boolean state, Object result, Integer total, Integer pagenumber, String msg) {
		super();
		this.state = state;
		this.result = result;
		this.total = total;
		this.pagenumber = pagenumber;
		this.msg = msg;
	}

	public Boolean getState() {
		return state;
	}

	public void setState(Boolean state) {
		this.state = state;
	}

	public Object getResult() {
		return result;
	}

	public void setResult(Object result) {
		this.result = result;
	}

	public Integer getTotal() {
		return total;
	}

	public void setTotal(Integer total) {
		this.total = total;
	}

	public Integer getPagenumber() {
		return pagenumber;
	}

	public void setPagenumber(Integer pagenumber) {
		this.pagenumber = pagenumber;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	@Override
	public String toString() {
		return "Return [state=" + state + ", result=" + result + ", total=" + total + ", pagenumber=" + pagenumber
				+ ", msg=" + msg + ", code=" + code + "]";
	}

}
