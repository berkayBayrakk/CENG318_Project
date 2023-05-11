export const accounts=[
   { email:'admin@admin.com',
    password:'123'},
    { email:'user@user.com',
    password:'123'}
]

export const itemList=[
    {
        id:1,
        content:'Who is the best futbol player',
        url:`https://ceng-318-project.vercel.app/poll:${12}`,
        category:'Futbol',
        has:'admin@admin.com',
        questions:[
            {
                text:'Ronaldo vs Messi',
                choices:['Ronaldo','Messi']
            },
            {
                text:'Nereye gidelim',
                choices:['Izmir','Ankara','Bursa','Istanbul']
            }

        ]
    },
    {
        content:'Who wins the election of 2023',
        category:'Politics',
        has:'admin@admin.com'
    },
    {
        content:'Where will we go tonight',
        category:'Life',
        has:'admin@admin.com'
    },
    {
        content:'What is your favourite food',
        category:'Food',
        has:'admin@admin.com'
    },
    {
        content:'3',
        category:'c3',
        has:'admin@admin.com'
    },
   
   
   
    {
        content:'2',
        category:'c2',
        has:'user@user.com'
    },
    {
        content:'3',
        category:'c3',
        has:'user@user.com'
    },
    {
        content:'3',
        category:'c3',
        has:'user@user.com'
    },
    {
        content:'3',
        category:'c3',
        has:'user@user.com'
    },
    {
        content:'3',
        category:'c3',
        has:'user@user.com'
    },
]