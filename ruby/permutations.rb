# def permutations(qsf,asf)
#     if (qsf.empty?()==true)
#         puts asf
#     return 
#     end
#     ch = qsf[0,1]
#     roq = qsf[1,qsf.length()-1]
#     for i in (0..asf.length())
#         left = asf[0,i]
#         right = asf[i,asf.length-i]
#         permutations(roq,left+ch+right)
#     end
# end

# permutations("abc","")

def permutations(qsf,asf)
    if (qsf.empty?()==true)
        puts asf
        return
    end
    for i in (0..qsf.length-1)
        ch = qsf[i]
        roq = qsf[0,i] + qsf[i+1,qsf.length-1]
        permutations(roq,asf+ch);
    end
end

permutations("abc","")