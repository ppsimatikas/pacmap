import {Module} from "../domains/Module.tsx";
import {useQuery} from "@tanstack/react-query";
import {Package} from "../domains/Package.tsx";

const ms: Module[] = [
    {
        id: "1",
        package: "sui",
        packageId: "0x0000000000000000000000000000000000000000000000000000000000000002",
        module: "Token",
        description: "The \"token\" module, defines a framework for creating, managing, and enforcing policies around fungible token balances. It introduces the Token struct, representing an individual token with a unique ID and balance, and supports operations like minting, burning, splitting, merging, and transferring tokens. The module also includes TokenPolicy and TokenPolicyCap to define and enforce custom rules for token transactions, enabling governance mechanisms such as approvals and spending constraints. Additionally, it facilitates token-to-coin conversions, spending requests, and policy rule enforcement through structured action requests and validation mechanisms.",
        metrics: {
            transactions: 130000000,
            github: 6700
        },
        deployedAt: new Date(),
        keywords: ["token", "wallet"],
        code: `
module 0x2::address {
    public fun to_bytes(arg0: address) : vector<u8> {
        0x1::bcs::to_bytes<address>(&arg0)
    }
    
    public fun length() : u64 {
        32
    }
    
    public fun from_ascii_bytes(arg0: &vector<u8>) : address {
        assert!(0x1::vector::length<u8>(arg0) == 64, 0);
        let v0 = b"";
        let v1 = 0;
        while (v1 < 64) {
            0x1::vector::push_back<u8>(&mut v0, hex_char_value(*0x1::vector::borrow<u8>(arg0, v1)) << 4 | hex_char_value(*0x1::vector::borrow<u8>(arg0, v1 + 1)));
            v1 = v1 + 2;
        };
        from_bytes(v0)
    }
    
    native public fun from_bytes(arg0: vector<u8>) : address;
    native public fun from_u256(arg0: u256) : address;
    fun hex_char_value(arg0: u8) : u8 {
        if (arg0 >= 48 && arg0 <= 57) {
            arg0 - 48
        } else {
            let v1 = if (arg0 >= 65 && arg0 <= 70) {
                arg0 - 55
            } else {
                assert!(arg0 >= 97 && arg0 <= 102, 0);
                arg0 - 87
            };
            v1
        }
    }
    
    public fun max() : u256 {
        115792089237316195423570985008687907853269984665640564039457584007913129639935
    }
    
    public fun to_ascii_string(arg0: address) : 0x1::ascii::String {
        0x1::ascii::string(0x2::hex::encode(to_bytes(arg0)))
    }
    
    public fun to_string(arg0: address) : 0x1::string::String {
        0x1::string::from_ascii(to_ascii_string(arg0))
    }
    
    native public fun to_u256(arg0: address) : u256;
    // decompiled from Move bytecode v6
}
        `
    },
    {
        id: "2",
        package: "sui",
        packageId: "0x0000000000000000000000000000000000000000000000000000000000000002",
        module: "Token",
        description: "The \"token\" module, defines a framework for creating, managing, and enforcing policies around fungible token balances. It introduces the Token struct, representing an individual token with a unique ID and balance, and supports operations like minting, burning, splitting, merging, and transferring tokens. The module also includes TokenPolicy and TokenPolicyCap to define and enforce custom rules for token transactions, enabling governance mechanisms such as approvals and spending constraints. Additionally, it facilitates token-to-coin conversions, spending requests, and policy rule enforcement through structured action requests and validation mechanisms.",
        metrics: {
            transactions: 130000000,
            github: 6700
        },
        deployedAt: new Date(),
        keywords: ["token", "wallet"],
        code: `
            module 0x2::address {
                public fun to_bytes(arg0: address) : vector<u8> {
                    0x1::bcs::to_bytes<address>(&arg0)
                }
                
                public fun length() : u64 {
                    32
                }
                
                public fun from_ascii_bytes(arg0: &vector<u8>) : address {
                    assert!(0x1::vector::length<u8>(arg0) == 64, 0);
                    let v0 = b"";
                    let v1 = 0;
                    while (v1 < 64) {
                        0x1::vector::push_back<u8>(&mut v0, hex_char_value(*0x1::vector::borrow<u8>(arg0, v1)) << 4 | hex_char_value(*0x1::vector::borrow<u8>(arg0, v1 + 1)));
                        v1 = v1 + 2;
                    };
                    from_bytes(v0)
                }
                
                native public fun from_bytes(arg0: vector<u8>) : address;
                native public fun from_u256(arg0: u256) : address;
                fun hex_char_value(arg0: u8) : u8 {
                    if (arg0 >= 48 && arg0 <= 57) {
                        arg0 - 48
                    } else {
                        let v1 = if (arg0 >= 65 && arg0 <= 70) {
                            arg0 - 55
                        } else {
                            assert!(arg0 >= 97 && arg0 <= 102, 0);
                            arg0 - 87
                        };
                        v1
                    }
                }
                
                public fun max() : u256 {
                    115792089237316195423570985008687907853269984665640564039457584007913129639935
                }
                
                public fun to_ascii_string(arg0: address) : 0x1::ascii::String {
                    0x1::ascii::string(0x2::hex::encode(to_bytes(arg0)))
                }
                
                public fun to_string(arg0: address) : 0x1::string::String {
                    0x1::string::from_ascii(to_ascii_string(arg0))
                }
                
                native public fun to_u256(arg0: address) : u256;
                // decompiled from Move bytecode v6
            }
        `
    },
    {
        id: "3",
        package: "sui",
        packageId: "0x0000000000000000000000000000000000000000000000000000000000000002",
        module: "Token",
        description: "The \"token\" module, defines a framework for creating, managing, and enforcing policies around fungible token balances. It introduces the Token struct, representing an individual token with a unique ID and balance, and supports operations like minting, burning, splitting, merging, and transferring tokens. The module also includes TokenPolicy and TokenPolicyCap to define and enforce custom rules for token transactions, enabling governance mechanisms such as approvals and spending constraints. Additionally, it facilitates token-to-coin conversions, spending requests, and policy rule enforcement through structured action requests and validation mechanisms.",
        metrics: {
            transactions: 130000000,
            github: 6700
        },
        deployedAt: new Date(),
        keywords: ["address", "wallet"],
        code: `
            module 0x2::address {
                public fun to_bytes(arg0: address) : vector<u8> {
                    0x1::bcs::to_bytes<address>(&arg0)
                }
                
                public fun length() : u64 {
                    32
                }
                
                public fun from_ascii_bytes(arg0: &vector<u8>) : address {
                    assert!(0x1::vector::length<u8>(arg0) == 64, 0);
                    let v0 = b"";
                    let v1 = 0;
                    while (v1 < 64) {
                        0x1::vector::push_back<u8>(&mut v0, hex_char_value(*0x1::vector::borrow<u8>(arg0, v1)) << 4 | hex_char_value(*0x1::vector::borrow<u8>(arg0, v1 + 1)));
                        v1 = v1 + 2;
                    };
                    from_bytes(v0)
                }
                
                native public fun from_bytes(arg0: vector<u8>) : address;
                native public fun from_u256(arg0: u256) : address;
                fun hex_char_value(arg0: u8) : u8 {
                    if (arg0 >= 48 && arg0 <= 57) {
                        arg0 - 48
                    } else {
                        let v1 = if (arg0 >= 65 && arg0 <= 70) {
                            arg0 - 55
                        } else {
                            assert!(arg0 >= 97 && arg0 <= 102, 0);
                            arg0 - 87
                        };
                        v1
                    }
                }
                
                public fun max() : u256 {
                    115792089237316195423570985008687907853269984665640564039457584007913129639935
                }
                
                public fun to_ascii_string(arg0: address) : 0x1::ascii::String {
                    0x1::ascii::string(0x2::hex::encode(to_bytes(arg0)))
                }
                
                public fun to_string(arg0: address) : 0x1::string::String {
                    0x1::string::from_ascii(to_ascii_string(arg0))
                }
                
                native public fun to_u256(arg0: address) : u256;
                // decompiled from Move bytecode v6
            }
        `
    },
]

function getPackages(modules: any): Package[] {
    const dict = modules.reduce((acc: any, curr: any) => {
        const pkg = curr.packageId;
        if (!acc[pkg]) {
            acc[pkg] = {
                name: curr.package,
                transactions: 0,
                github: 0,
            };
        }
        acc[pkg].transactions += curr.metrics.transactions;
        acc[pkg].github += curr.metrics.github;
        return acc;
    }, {});

    return Object.keys(dict).map((id: string) => ({
        id,
        name: dict[id].name,
        metrics: {
            transactions: dict[id].transactions,
            github: dict[id].github,
        }
    }));
}

export function useModules() {
    const {data: modules, isLoading} = useQuery({
        queryKey: ['modules'],
        queryFn: () => Promise.resolve(ms),
        staleTime: 60 * 1000,
    });

    const packages = modules ? getPackages(modules) : [];

    return {
        modules,
        packages,
        loading: isLoading
    }
}
