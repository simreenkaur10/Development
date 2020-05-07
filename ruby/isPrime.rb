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
a= is_prime(11)
puts "Number 11 is prime ? :" + a.to_s()
puts "hi i am new to ruby"
puts a.class
