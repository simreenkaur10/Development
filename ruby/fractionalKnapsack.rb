class Item
    attr_accessor :val , :wt , :ratio
    def initialize(val,wt)
        @val = val;
        @wt = wt;
        @ratio = val.to_f/wt;
    end
    def to_s
        return "#{val.to_s} - #{wt.to_s}"
    end
    def <=>(other)
        if(@ratio>other.ratio)
            return -1
        elseif(other.ratio>@ratio)
        return+1
        else
            return 0
        end
    end
end
prices = [15,14,10,45,30]
wts = [2,5,1,3,4]
items = []
for i in (0..prices.length-1)
    singleItem = Item.new(prices[i],wts[i])
    items.push(singleItem)
end
ratio_arr = items.sort()
vib = 0
rc = 7
idx = 0
while(idx<items.length)
    if(rc>ratio_arr[idx].wt)
        vib = vib + ratio_arr[idx].val
        rc = rc-ratio_arr[idx].wt
    else
        vib = vib + rc*ratio_arr[idx].ratio
        rc =0
        break
    end
    idx = idx+1

end

puts vib