class Edge
    attr_accessor :nvtx,:wt
    #constructor
    def initialize(nvtx,wt)
        @nvtx = nvtx
        @wt = wt
    end
    def to_s
        return nvtx.to_s + "  @  "+wt.to_s;
    end
end
graph = [];
graph[0] = [Edge.new(1,10),Edge.new(3,40)]
graph[1] = [Edge.new(0,10),Edge.new(2,10)]
graph[2] = [Edge.new(1,10),Edge.new(3,10)]
graph[3] = [Edge.new(0,40),Edge.new(4,2),Edge.new(2,10)]
graph[4] = [Edge.new(3,2),Edge.new(6,5),Edge.new(5,3)]
graph[5] = [Edge.new(4,3),Edge.new(6,3)]
graph[6] = [Edge.new(5,3),Edge.new(4,5)]

def Dpair
    attr_accessor :vtx,:psf,:csf
    def initialize(vtx,psf,csf)
        @vtx=vtx
        @psf=psf
        @csf=csf
    end
    def to_s
        return "#{@vtx.to_s} - #{@psf.to_s} - #{@csf.to_s}"
    end
end

def dijakstra(graph,srcVtx)
    pq= PriorityQueue.new()
    pq.push(Dpair.new(srcVtx,srcVtx.to_s,0),0)
    hash = {}
    while pq.size()>0
        rem = pq.pop()
        if(hash.key?(rem.vtx))
            next
        end
        hash[rem.vtx]=true
        puts rem
        for ei in (0..graph[rem.vtx].length-1)



# def display(graph)
#     for vtx in (0..graph.length-1)
#         print vtx.to+s + "-->"
#         for ei in (0..graph[vtx].length-1)
#             print graph[vtx][ei].to_s()+ " , "
#         end
#     end

# end
# display(graph)