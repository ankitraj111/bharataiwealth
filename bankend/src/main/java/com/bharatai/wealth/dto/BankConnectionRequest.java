package com.bharatai.wealth.dto;

import lombok.Data;

@Data
public class BankConnectionRequest {
    private String bankName;
    private String accountLastFour;
}
