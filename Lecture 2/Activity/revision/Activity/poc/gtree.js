let root= {
data: 10 ,
children:[
    {
        data:20 ,
        children:[ {
         data:50,children:[]
        },
        {
         data:60,
         children:[]
        }

        ]
    },
    {
        data:30 ,
        children:[ {
         data:70,children:[]
        },
        {
         data:80,
         children:[]
        }

        ]
    },
   {
        data:40 ,
        children:[ {
         data:90,children:[]
        },
        {
         data:100,
         children:[]
        }

        ]
    }
]
}

function gtree(node){
    let ans = node.data + " ==> " ;
    for(let i=0;i<node.children.length;i++){
        ans = ans + node.children[i].data + " , ";
    } 
    console.log(ans);
    for(let i=0;i<node.children.length;i++){
        let child = node.children[i];
        gtree(child);
    }
}

gtree(root);