m = ARGV[0].to_i;
n = ARGV[1].to_i;
ARGV.clear();

arr = []
for i in (0..(m-1))
    row= []
    for j in (0..(n-1))
        val = gets.chomp.to_i
        row.push(val)
    end
    arr.push(row)
end

def spiral(a,n,m)
    rMin =0
    rMax = n-1
    cMin=0
    cMax=m-1
    count=1
    totalElements = n*m 
    while(count<=totalElements)
        for i in (rMin..rMax)
            if(count<= totalElements)
                print a[i][cMin].to_s()+"\t"
                count+=1
            end
        end
        # left wall
    cMin+=1
    for i in (cMin..cMax)
        if(count<=totalElements)
            print a[rMax][i].to_s()+"\t"
            count+=1
            end
        end
           # bottom wall
    rMax-=1
    for i in (rMax).downto(rMin)
        if(count<=totalElements)
                print a[i][cMax].to_s()+"\t";
                count+=1
            end
        end
           # right wall
    cMax-=1
    for i in (cMax).downto(cMin)
        if(count<=totalElements)
                print a[rMin][i].to_s()+"\t"
                count+=1
            end
        end
        # top wall
    rMin+=1
    
    end
end


spiral(arr,m,n)