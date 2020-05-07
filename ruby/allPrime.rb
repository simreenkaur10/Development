def is_prime(num)
    div = 2
    while(div*div<=num)
        if(num%div==0)
            return false;
        end
        div+=1;
    end
    return true;
end

def print_allPrime(num)
for i in (2..num)
    is_status = is_prime(i)
    if(is_status)
        puts i.to_s() + "\t"
    end

end

end


print_allPrime(100)