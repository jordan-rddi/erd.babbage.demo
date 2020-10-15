pragma solidity >0.6.0;

contract SimpleStorage {
    uint public storedData;
    address public owner;

    event OwnerChanged(address indexed _owner);
    
    modifier onlyOwner {
        require (msg.sender == owner, 'Only the owner can call this function');
        _;
    }
    
    constructor(uint initial) public {
        storedData = initial;
        owner = msg.sender;
    }

    function changeOwner(address newOwner) public onlyOwner {
        owner = newOwner;
        emit OwnerChanged(newOwner);
    }


    function set(uint x) public onlyOwner {
        storedData = x;
    }
}