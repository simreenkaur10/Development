# def print_Subsequence(str, s)
#     if ( str.length() ==0 )
#         puts s;
#         return
#     end
#     ch = str[0,1]
#     ros = str[1,str.length()-1]
#     print_Subsequence(ros,s)
#     print_Subsequence(ros,s+ch)
# end

# print_Subsequence("abc","")

def print_Subsequence(str)
    if(str.length() == 0 )
        base = [];
        base.push(".")
        return base;
    end
    ch = str[0,1];
    ros = str[1,str.length()-1]
    recResult = print_Subsequence(ros)
    res=[]
    for i in (0..recResult.length-1)
        res.push(recResult[i])
    end
    for i in (0..recResult.length-1)
        res.push(ch+recResult[i])
    end
    return res
end
puts print_Subsequence("abc")