// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "forge-std/console.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { IERC20Metadata } from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";

import { CrowdSale, Sale, SaleInfo } from "../src/crowdsale/CrowdSale.sol";
import { IPermissioner } from "../src/Permissioner.sol";

import { CrowdSaleHelpers } from "./helpers/CrowdSaleHelpers.sol";
import { FakeERC20 } from "../src/helpers/FakeERC20.sol";

contract CrowdSaleFuzzTest is Test {
    address emitter = makeAddr("emitter");
    address anyone = makeAddr("anyone");

    FakeERC20 internal auctionToken;
    FakeERC20 internal biddingToken;
    CrowdSale internal crowdSale;

    function setUp() public {
        crowdSale = new CrowdSale();
        auctionToken = new FakeERC20("IPTOKENS","IPT");
        biddingToken = new FakeERC20("USD token", "USDC");
    }

    function testFuzzManyBidders(uint8 bidders, uint96 salesAmt, uint96 fundingGoal) public {
        vm.assume(bidders > 0 && bidders < 25);
        vm.assume(salesAmt > 0.5 ether);
        vm.assume(fundingGoal > 1 ether);

        auctionToken.mint(emitter, salesAmt);

        vm.startPrank(emitter);
        Sale memory _sale = Sale({
            beneficiary: emitter,
            auctionToken: IERC20Metadata(address(auctionToken)),
            biddingToken: IERC20Metadata(address(biddingToken)),
            fundingGoal: fundingGoal,
            salesAmount: salesAmt,
            closingTime: uint64(block.timestamp + 2 hours),
            permissioner: IPermissioner(address(0x0))
        });

        auctionToken.approve(address(crowdSale), salesAmt);
        uint256 saleId = crowdSale.startSale(_sale);
        vm.stopPrank();

        address[] memory _bidders = new address[](bidders);

        for (uint8 it = 0; it < bidders; it++) {
            address someone = makeAddr(string(abi.encode("bidder", it)));
            _bidders[it] = someone;
            vm.startPrank(someone);
            uint256 bid = 1000 ether;
            biddingToken.mint(someone, bid);
            biddingToken.approve(address(crowdSale), bid);
            crowdSale.placeBid(saleId, bid, "");
            vm.stopPrank();
        }
        vm.warp(_sale.closingTime + 60 seconds);

        vm.startPrank(anyone);
        crowdSale.settle(saleId);
        crowdSale.claimResults(saleId);
        vm.stopPrank();

        for (uint8 it = 0; it < bidders; it++) {
            address someone = _bidders[it];

            vm.startPrank(someone);
            crowdSale.claim(saleId, "");
            vm.stopPrank();
        }
        //dust
        assertLt(auctionToken.balanceOf(address(crowdSale)), 0.00001 ether);
        assertLt(biddingToken.balanceOf(address(crowdSale)), 0.00001 ether);
    }
}
