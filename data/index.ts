export default {
    columns: [
        {
            name: 'Juin 2024',
        },
        {
            name: 'Juillet 2024',
        },
        {
            name: 'Aout 2024',
        }
    ],
    metaData: {
        title: 'Roadmap S12',
        colSize: 470,
        tagsType: [
            'design',
            'dev',
            'test'
        ]
    },
    products: [
        {
            name: 'Production',
            color: '#F3713E',
            segments: [
                {
                    name: 'Monitoring',
                    lines: [
                        {
                            tasks: [
                                {
                                    name: 'Prometeus Grafana',
                                    subtitle: '',
                                    position: {
                                        start: 0,
                                        end: 24
                                    },
                                    tags: {
                                        timeline: false,
                                        list: [
                                            {
                                                name: 'Infra',
                                                type: 'dev',
                                                position: {
                                                    start: 0,
                                                    end: 2
                                                }
                                            }
                                        ]
                                    }

                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}