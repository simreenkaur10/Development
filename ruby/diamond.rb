n = ARGV[0].to_i;
ARGV.clear();
spaces = n/2;
stars = 1;
for i in (0..n-1)
 for j in (0..spaces-1)
    print "\t"
 end
 for k in (0.. stars-1)
    print "*\t"
 end
 puts
 if(i<n/2)
    stars = stars+2;
    spaces=spaces-1;
 else
    stars = stars-2;
    spaces=spaces+1;
 end
end
